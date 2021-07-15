import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    key: string
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTusk: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}
export const TodoList = (props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState <null | string>(null)

    const addTask = () => {
        if (title.trim() !=="") {
            props.addTask(title, props.id)
            setTitle("")
        } else setError("Title is required!")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        { if (e.charCode === 13) {
            addTask()
        }}
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={() => props.removeTodoList(props.id)}>x</button>
            <div>
                <input className={error ? "error" : ""}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTusk(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )})
                }

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
