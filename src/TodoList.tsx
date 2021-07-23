import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todoListId: string
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
export const TodoList = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const removeTodolist = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todoListId, title)
    },[props.changeTodolistTitle, props.todoListId])

    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }

    const onAllClickHandler = useCallback(
        () => props.changeFilter( props.todoListId, "all"),[props.changeFilter, props.todoListId])
    const onActiveClickHandler = useCallback(
        () => props.changeFilter( props.todoListId, "active"), [props.changeFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(
        () => props.changeFilter(props.todoListId, "completed"), [props.changeFilter, props.todoListId])

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodoList.map(t => <Task key={t.id}
                                                 task={t}
                                                 todoListId={props.todoListId}
                                                 removeTask={props.removeTusk}
                                                 changeTaskStatus={props.changeStatus}
                                                 changeTaskTitle={props.changeTaskTitle}/>
                    )
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
})
