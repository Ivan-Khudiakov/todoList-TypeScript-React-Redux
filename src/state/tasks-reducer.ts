import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoList, RemoveTodoList} from "./todolists-reducer";

const ADD_TASK = "task/ADD_TASK"
const REMOVE_TASK = "task/REMOVE_TASK"
const CHANGE_TASK_STATUS = "task/CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "task/CHANGE_TASK_TITLE"
const ADD_TODOLIST = "todoList/ADD_TODOLIST"
const REMOVE_TODOLIST = "todoList/REMOVE_TODOLIST"

type ActionType =
    ReturnType<typeof AddTask> |
    ReturnType<typeof RemoveTask> |
    ReturnType<typeof ChangeTaskStatus> |
    ReturnType<typeof ChangeTaskTitle> |
    ReturnType<typeof AddTodoList> |
    ReturnType<typeof RemoveTodoList>

const initialState: TasksStateType = {}

export const tasksReducer = (state:TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK: {
            let task = {id: v1(), title: action.title, isDone: false}
            let newState = {...state}
            let todoListTasks = newState[action.todoListId]
            newState[action.todoListId] = [...todoListTasks, task]
            return newState
        }
        case REMOVE_TASK: {
            let newState = {...state}
            let todoListTasks = newState[action.todoListId]
            newState[action.todoListId] = todoListTasks.filter(t => t.id !== action.id)
            return newState
        }
        case CHANGE_TASK_STATUS: {
            let todoListTasks = state[action.todoListId]
            let newTaskArray = todoListTasks.map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            state[action.todoListId] = newTaskArray
            return ({...state})
        }
        case CHANGE_TASK_TITLE: {
            let todoListTasks = state[action.todoListId]
            let newTaskArray = todoListTasks.map(t => t.id === action.id ? {...t, title: action.title} : t)
            state[action.todoListId] = newTaskArray
            return ({...state})
        }
        case ADD_TODOLIST: {
            let newState = {...state}
            newState[action.todoListId] = []
            return newState
        }
        case REMOVE_TODOLIST: {
            let newState = {...state}
            delete newState[action.todoListId]
            return newState
        }
        default:
            return state
    }
}

export const AddTask = (title: string, todoListId: string) => ({type: ADD_TASK, title, todoListId} as const)
export const RemoveTask = (id: string, todoListId: string) => ({type: REMOVE_TASK, id, todoListId} as const)
export const ChangeTaskStatus = (id: string, isDone: boolean, todoListId: string) => ({type: CHANGE_TASK_STATUS, id, isDone, todoListId} as const)
export const ChangeTaskTitle = (id: string, title: string, todoListId: string) => ({type: CHANGE_TASK_TITLE, id, title, todoListId} as const)


