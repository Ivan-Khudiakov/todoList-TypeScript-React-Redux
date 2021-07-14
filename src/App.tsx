import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType =  "all" | "active" | "completed"

export const App = () => {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Vue", isDone: false},
        {id: v1(), title: "Angular", isDone: false}
    ])
    function removeTusk (id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeFilter (value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        // let task = {id: v1(), title: "New Task", isDone: false}
        // let newTasks = [...tasks, task]
        // setTasks(newTasks)
        setTasks([...tasks,{id: v1(), title: title, isDone: false}])
    }
    function changeStatus (id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      filter={filter}
                      tasks={tasksForTodolist}
                      removeTusk={removeTusk}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    );
}

