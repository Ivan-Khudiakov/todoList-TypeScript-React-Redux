import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeFilter: (todoListId: string, value: FilterValuesType) => void
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


    const onAllClickHandler = () => props.changeFilter( props.id, "all")
    const onActiveClickHandler = () => props.changeFilter( props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                        <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox checked={t.isDone}
                                      color="primary"
                                      onChange={onChangeHandler}
                            />
                            <EditableSpan title={t.title} onChange={changeTitle}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )})
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        color={"default"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
