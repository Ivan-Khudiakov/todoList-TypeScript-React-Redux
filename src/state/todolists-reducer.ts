import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const ADD_TODOLIST = "todoList/ADD_TODOLIST"
const REMOVE_TODOLIST = "todoList/REMOVE_TODOLIST"
const CHANGE_TODOLIST_TITLE = "todoList/CHANGE_TODOLIST_TITLE"
const CHANGE_FILTER = "todoList/CHANGE_FILTER"

type ActionType =
    ReturnType<typeof AddTodoList> |
    ReturnType<typeof RemoveTodoList> |
    ReturnType<typeof ChangeTodoListTitle> |
    ReturnType<typeof ChangeFilter>

const initialState: Array<TodolistType> = []

export const todoListsReducer = (state:Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case ADD_TODOLIST: {
            const newTodoListId = action.todoListId
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
            return state
    }
}

export const AddTodoList = (title: string) => ({type: ADD_TODOLIST, title, todoListId: v1()} as const)
export const RemoveTodoList = (todoListId: string) => ({type: REMOVE_TODOLIST, todoListId} as const)
export const ChangeFilter = (todoListId: string, value: FilterValuesType) => ({type: CHANGE_FILTER, todoListId, value} as const)
export const ChangeTodoListTitle = (todoListId: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, todoListId, title} as const)


