import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const ADD_TODOLIST = "todoList/ADD_TODOLIST"
const REMOVE_TODOLIST = "todoList/REMOVE_TODOLIST"
const CHANGE_TODOLIST_TITLE = "todoList/CHANGE_TODOLIST_TITLE"
const CHANGE_FILTER = "todoList/CHANGE_FILTER"

type ActionType =
    ReturnType<typeof addTodoList> |
    ReturnType<typeof removeTodoList> |
    ReturnType<typeof changeTodoListTitle> |
    ReturnType<typeof changeFilter>

export const todoListsReducer = (state:Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case ADD_TODOLIST: {
            const newTodoListId = v1()
            const newTodoList: TodolistType = {id: newTodoListId, title: action.title, filter: "all"}
            return [...state, newTodoList]
        }
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case CHANGE_FILTER: {
            const todoList = state.find(tl => tl.id === action.todoListId)
            if (todoList) {
                todoList.filter = action.value
            }
            return [...state]
        }
        case CHANGE_TODOLIST_TITLE: {
            const todoList = state.find(tl => tl.id === action.todoListId)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        default:
            return [...state]
    }
}

export const addTodoList = (title: string) => ({type: ADD_TODOLIST, title} as const)
export const removeTodoList = (todoListId: string) => ({type: REMOVE_TODOLIST, todoListId} as const)
export const changeFilter = (todoListId: string, value: FilterValuesType) => ({type: CHANGE_FILTER, todoListId, value} as const)
export const changeTodoListTitle = (todoListId: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, todoListId, title} as const)


