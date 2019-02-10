import createReducer from './createReducer';
import { Action, ActionType, EditTodoTextPayload, Todo } from '../model/model';

export const todoList = createReducer([], {
    [ActionType.ADD_TODO](state: Array<Todo>, action: Action<Todo>) {
        return [...state, action.payload];
    },
    [ActionType.COMPLETE_TODO](state: Array<Todo>, action: Action<number>) {
        // search after todo item with the given id and set completed to true
        return state.map(t => t.id === action.payload ? {...t, completed: true} : t);
    },
    [ActionType.UNCOMPLETE_TODO](state: Array<Todo>, action: Action<number>) {
        // search after todo item with the given id and set completed to false
        return state.map(t => t.id === action.payload ? {...t, completed: false} : t);
    },
    [ActionType.MAKE_TODO_EDITABLE](state: Array<Todo>, action: Action<number>) {
        return state.map(t => t.id === action.payload ? {...t, isBeingEdited: true} : t);
    },
    [ActionType.EDIT_TODO_TEXT](state: Array<Todo>, action: Action<EditTodoTextPayload>) {
        return state.map(t => t.id === action.payload.todoId ?
            {
                ...t,
                text: action.payload.updatedTodoText,
                isBeingEdited: false
            } :
            t
        );
    },
    [ActionType.DELETE_TODO](state: Array<Todo>, action: Action<number>) {
        // remove all todos with the given id
        return state.filter(t => t.id !== action.payload);
    },
});
