import { Action, ActionType, EditTodoTextPayload, Todo } from '../model/model';

export function addTodo(todo: Todo): Action<Todo> {

    return {
        type: ActionType.ADD_TODO,
        payload: todo
    };
}

// TODO-Tom: Add Effect here.
export function completeTodo(todoId: number) {

    return (dispatch: Function, getState: Function) => {

        dispatch({ type: ActionType.COMPLETE_TODO, payload: todoId });
    };
}

export function uncompleteTodo(todoId: number): Action<number> {

    return {
        type: ActionType.UNCOMPLETE_TODO,
        payload: todoId
    };
}

export function makeTodoEditable(todoId: number): Action<number> {
    return {
        type: ActionType.MAKE_TODO_EDITABLE,
        payload: todoId,
    };
}

export function editTodoText(todoId: number, updatedTodoText: string): Action<EditTodoTextPayload> {
    return {
        type: ActionType.EDIT_TODO_TEXT,
        payload: {
            todoId,
            updatedTodoText,
        },
    };
}

export function deleteTodo(todoId: number): Action<number> {

    return {
        type: ActionType.DELETE_TODO,
        payload: todoId
    };
}
