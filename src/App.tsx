import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType =  "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>( [
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

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [...todoListTasks, task]
        setTasks({...tasks})
    }
    function removeTusk (id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
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
    function changeTaskTitle (id: string, title: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }
    function changeTodolistTitle (id: string, title: string) {
        let todoList = todoLists.find(t => t.id === id)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }
    function addTodolist (title: string) {
        let newTodoListId = v1()
        let newTodolist: TodolistType = {id: newTodoListId, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodolist])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
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

