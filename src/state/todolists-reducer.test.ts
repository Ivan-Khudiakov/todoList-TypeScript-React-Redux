import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {addTodoList, todoListsReducer} from "./totdolists-reducer";

let todoListId1 = v1()
let todoListId2 = v1()

const startState: Array<TodolistType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
]

test('correct todolist should be added', () => {

    let newTodoListTitle = "New Todolist"

    let action = addTodoList(newTodoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, { type: "todoList/REMOVE_TODOLIST", todoListId: todoListId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should change its name', () => {

    let newTodoListTitle = "New Todolist"

    const endState = todoListsReducer(startState, {
        type: "todoList/CHANGE_TODOLIST_TITLE",
        todoListId: todoListId2,
        title: newTodoListTitle})

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed"

    const endState = todoListsReducer(startState, {
        type: "todoList/CHANGE_FILTER",
        todoListId: todoListId2,
        value: newFilter
    });

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
});


