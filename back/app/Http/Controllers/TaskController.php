<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    private $user;
    private $task;

    public function __construct(User $user, Task $task)
    {
        $this->user = $user;
        $this->task = $task;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        if ($this->user->isAdmin()) {
            return $this->task->all();
        } else {
            return $this->task->where('owner_id', Auth::id())->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return string[]
     */
    public function store(Request $request): array
    {
        return ['store' => 'ok'];
    }

    /**
     * Display the specified resource.
     *
     * @return string
     */
    public function show()
    {
        if (User::where('id', Auth::id()) === 'jucius.tomas@gmail.com') return 'pipopu';
        return Task::where('owner_id', Auth::id())->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Task $task
     * @return string[]
     */
    public function update(Request $request, Task $task): array
    {
        return ['update' => 'ok'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Task $task
     * @return string[]
     */
    public function destroy(Task $task): array
    {
        return ['destroy' => 'ok'];
    }
}
