<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    private $user;
    private $task;
    private $request;

    public function __construct(Request $request, User $user, Task $task)
    {
        $this->user = $user;
        $this->task = $task;
        $this->request = $request;
    }

    /**
     * Returning all the needed information about task to front. If user is admin, returning also all users information
     *
     * @param string $sort
     * @return Task[]|Collection|Response
     */
    public function index($sort = 'created_at')
    {
        if ($this->user->isAdmin()) {
            return [
                'tasks' => $this
                    ->task
                    ->select('id', 'name', 'status', 'owner_id', 'created_at')
                    ->orderBy($sort, 'desc')
                    ->get(),
                'users' => $this
                    ->user
                    ->select('id', 'name', 'email')
                    ->where('role', 'ROLE_USER')
                    ->orderBy('name', 'asc')
                    ->get()
            ];
        } else {

            return ['tasks' => $this->task->select('id', 'name', 'status')->where('owner_id', Auth::id())->get()];
        }
    }

    public function create()
    {
        $taskData = $this->request->only('name', 'user');

        $validator = Validator::make($taskData, [
            'name' => 'required|max:200|regex:/^[a-z \?\!\.\,+]*$/i',
            'user' => 'required|integer',
        ]);

        if ($validator->fails()) return $validator->errors();

        $task = new Task();
        $task->name = $this->request->get('name');
        $task->status = 'todo';
        $task->owner_id = $this->request->get('user');
        try {
            $task->save();

        } catch (QueryException $e) {
            if ($e->getCode() === 2002) {
                $message = 'Connection to database refused';
            } else {
                $message = 'Unknown error, please contact administrator';
            }

            return ['message' => $message];
        }

        return ['success' => true];
    }

    /**
     * Updating the task from admin section
     */
    public function update($id)
    {
        $taskData = $this->request->only('name', 'owner_id', 'status');

        $validator = Validator::make($taskData, [
            'name' => 'required|max:100|regex:/^[a-z +]*$/i',
            'owner_id' => 'required|integer',
            'status' => 'required|in:todo,progress,done'
        ]);

        if ($validator->fails()) return $validator->errors();

        $task = Task::where('id', $id);
        try {
            $task->update([
                'name' => $this->request->get('name'),
                'owner_id' => $this->request->get('owner_id'),
                'status' => $this->request->get('status')
            ]);

        } catch (QueryException $e) {
            if ($e->getCode() === 2002) {
                $message = 'Connection to database refused';
            } else {
                $message = 'Unknown error, please contact administrator';
            }

            return ['message' => $message];
        }

        return ['success' => true];
    }

    /**
     * Updating task status by simple user
     */
    public function updateStatus($id)
    {

        $taskData = $this->request->only('status');
        $taskData['owner_id'] = Task::select('owner_id')->where('id', $id)->pluck('owner_id')->first();
        $taskData['my_id'] = Auth::id();


        $validator = Validator::make($taskData, [
            'status' => 'required|in:todo,progress,done',
            'owner_id' => 'required|integer',
            'my_id' => 'required|same:owner_id'
        ], [
            'my_id.same' => 'You can only change status of your own tasks'
        ]);

        if ($validator->fails()) return $validator->errors();

        $task = Task::where('id', $id);
        try {
            $task->update([
                'status' => $this->request->get('status')
            ]);

        } catch (QueryException $e) {
            if ($e->getCode() === 2002) {
                $message = 'Connection to database refused';
            } else {
                $message = 'Unknown error, please contact administrator';
            }

            return ['message' => $message];
        }

        return ['success' => true];
    }

    public function delete($id)
    {
        $task = Task::where('id', $id)->first();
        $result = $task->delete();

        return ['success' => $result];
    }

}
