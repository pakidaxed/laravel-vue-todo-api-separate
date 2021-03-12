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
    /**
     * Display a listing of the resource.
     *
     * @return string[]
     */
    public function index(): array
    {
        return ['index' => 'ok'];
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
     * @param Task $task
     */
    public function show(Task $task)
    {
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
