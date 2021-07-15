import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType =  "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>( [
        {id: todoListId1, title: "What to learn", filter: 'all'},
        {id: todoListId2, title: "What to read", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JavaScript", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Vue", isDone: false},
            {id: v1(), title: "Angular", isDone: false}
        ],
    })

    function removeTusk (id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [...todoListTasks, task]
        setTasks({...tasks})
    }
    function changeStatus (id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let allTodoListTasks = tasks[tl.id]
                let tasksForTodolist = allTodoListTasks

                if (tl.filter === "active") {
                    tasksForTodolist = allTodoListTasks.filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodoListTasks.filter(t => t.isDone)
                }
                return (
                    <TodoList key={tl.id}
                              id={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              tasks={tasksForTodolist}
                              removeTusk={removeTusk}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              removeTodoList={removeTodoList}/>
                )
            })}

        </div>
    )
}

