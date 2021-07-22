import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoList, removeTodoList} from "./totdolists-reducer";

const ADD_TASK = "task/ADD_TASK"
const REMOVE_TASK = "task/REMOVE_TASK"
const CHANGE_TASK_STATUS = "task/CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "task/CHANGE_TASK_TITLE"
const ADD_TODOLIST = "todoList/ADD_TODOLIST"
const REMOVE_TODOLIST = "todoList/REMOVE_TODOLIST"

type ActionType =
    ReturnType<typeof addTask> |
    ReturnType<typeof removeTask> |
    ReturnType<typeof changeTaskStatus> |
    ReturnType<typeof changeTaskTitle> |
    ReturnType<typeof addTodoList> |
    ReturnType<typeof removeTodoList>

export const tasksReducer = (state:TasksStateType, action: ActionType): TasksStateType => {
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
            let newState = {...state}
            let changedTask = newState[action.todoListId].find(t => t.id === action.id)
            if (changedTask) {
                changedTask.isDone = action.isDone
            }
            return newState
        }
        case CHANGE_TASK_TITLE: {
            let newState = {...state}
            let changedTask = newState[action.todoListId].find(t => t.id === action.id)
            if (changedTask) {
                changedTask.title = action.title
            }
            return newState
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

export const addTask = (title: string, todoListId: string) => ({type: ADD_TASK, title, todoListId} as const)
export const removeTask = (id: string, todoListId: string) => ({type: REMOVE_TASK, id, todoListId} as const)
export const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => ({type: CHANGE_TASK_STATUS, id, isDone, todoListId} as const)
export const changeTaskTitle = (id: string, title: string, todoListId: string) => ({type: CHANGE_TASK_TITLE, id, title, todoListId} as const)


