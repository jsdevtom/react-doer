
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    isBeingEdited: boolean;
}

export enum ActionType {
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    COMPLETE_TODO = 'COMPLETE_TODO',
    MAKE_TODO_EDITABLE = 'MAKE_TODO_EDITABLE',
    EDIT_TODO_TEXT = 'EDIT_TODO_TEXT',
    UNCOMPLETE_TODO = 'UNCOMPLETE_TODO',
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}

export interface EditTodoTextPayload {
    todoId: number;
    updatedTodoText: string;
}
