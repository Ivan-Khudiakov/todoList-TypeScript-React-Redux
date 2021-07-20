import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}
export const TodoList = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTusk(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={t.title} onChange={changeTitle}/>
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
