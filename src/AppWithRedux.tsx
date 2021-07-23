import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoList,
    ChangeTodoListTitle,
    RemoveTodoList,
    ChangeFilter
} from "./state/todolists-reducer";
import {AddTask, RemoveTask, ChangeTaskStatus, ChangeTaskTitle} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./App";

export type FilterValuesType =  "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const AppWithRedux = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function addTask(title: string, todoListId: string) {
        const action = AddTask(title, todoListId)
        dispatch(action)
    }
    function removeTusk (id: string, todoListId: string) {
        const action = RemoveTask(id, todoListId)
        dispatch(action)
    }
    function changeStatus (id: string, isDone: boolean, todoListId: string) {
        const action = ChangeTaskStatus(id, isDone, todoListId)
        dispatch(action)

    }
    function changeTaskTitle (id: string, title: string, todoListId: string) {
        const action = ChangeTaskTitle(id, title, todoListId)
        dispatch(action)

    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = ChangeFilter(todoListId, value)
        dispatch(action)
    }
    function removeTodoList(todoListId: string) {
        const action = RemoveTodoList(todoListId)
        dispatch(action)
    }
    function changeTodolistTitle (id: string, title: string) {
        const action = ChangeTodoListTitle(id, title)
        dispatch(action)
    }
    function addTodolist (title: string) {
        const action = AddTodoList(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>
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
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              filter={tl.filter}
                                              tasks={tasksForTodolist}
                                              removeTusk={removeTusk}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              removeTodoList={removeTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )}
                    )}
                </Grid>
            </Container>
        </div>
    )
}

