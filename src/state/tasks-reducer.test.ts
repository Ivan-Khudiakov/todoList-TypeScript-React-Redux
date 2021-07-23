import {TasksStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoList, removeTodoList} from "./todolists-reducer";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2":  [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    }
})

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, {
        type: "task/ADD_TASK",
        title: "juce",
        todoListId: "todoListId2"
    })

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][3].id).toBeDefined();
    expect(endState["todoListId2"][3].title).toBe("juce");
    expect(endState["todoListId2"][3].isDone).toBe(false);
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, {
        type: "task/REMOVE_TASK",
        id: "2",
        todoListId: "todoListId2"})

    expect(endState).toEqual({
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });
});

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, {type: "task/CHANGE_TASK_STATUS", id: "2", isDone: false, todoListId: "todoListId2"})

    expect(endState["todoListId2"][1].isDone).toBe(false);
    expect(endState["todoListId1"][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, {type: "task/CHANGE_TASK_TITLE", id: "3", title: "new title", todoListId: "todoListId1"})

    expect(endState["todoListId2"][2].title).toBe("tea");
    expect(endState["todoListId1"][2].title).toBe("new title");
    expect(endState["todoListId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {


    const action = addTodoList("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {


    const action = removeTodoList("todoListId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
