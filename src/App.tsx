import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterValuesType =  "all" | "active" | "completed"

export const App = () => {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: false},
        {id: 3, title: "JavaScript", isDone: true},
        {id: 4, title: "React", isDone: true},
        {id: 5, title: "Vue", isDone: false},
        {id: 6, title: "Angular", isDone: false}
    ])
    function removeTusk (id: number) {
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

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTusk={removeTusk}
                      changeFilter={changeFilter}/>
        </div>
    );
}

