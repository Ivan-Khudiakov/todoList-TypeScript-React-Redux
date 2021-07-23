import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, todoListId: string, title: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoListId)
    }
    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    },[props.task.id,props.changeTaskTitle,props.todoListId])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox checked={props.task.isDone}
                      color="primary"
                      onChange={onChangeHandler}
            />
            <EditableSpan title={props.task.title} onChange={changeTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
