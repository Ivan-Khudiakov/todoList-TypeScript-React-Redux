import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoList,
    ChangeTodoListTitle,
    todoListsReducer,
    RemoveTodoList,
    ChangeFilter
} from "./state/todolists-reducer";
import {AddTask, tasksReducer, RemoveTask, ChangeTaskStatus, ChangeTaskTitle} from "./state/tasks-reducer";

export type FilterValuesType =  "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const AppWithReducers = () => {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId1, title: "What to learn", filter: 'all'},
        {id: todoListId2, title: "What to read", filter: 'all'}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    function addTask(title: string, todoListId: string) {
        const action = AddTask(title, todoListId)
        dispatchToTasks(action)
    }
    function removeTusk (id: string, todoListId: string) {
        const action = RemoveTask(id, todoListId)
        dispatchToTasks(action)
    }
    function changeStatus (id: string, isDone: boolean, todoListId: string) {
        const action = ChangeTaskStatus(id, isDone, todoListId)
        dispatchToTasks(action)

    }
    function changeTaskTitle (id: string, title: string, todoListId: string) {
        const action = ChangeTaskTitle(id, title, todoListId)
        dispatchToTasks(action)

    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = ChangeFilter(todoListId, value)
        dispatchToTodoLists(action)
    }
    function removeTodoList(todoListId: string) {
        const action = RemoveTodoList(todoListId)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }
    function changeTodolistTitle (id: string, title: string) {
        const action = ChangeTodoListTitle(id, title)
        dispatchToTodoLists(action)
    }
    function addTodolist (title: string) {
        const action = AddTodoList(title)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
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
                                              todoListId={tl.id}
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

