import {
    Checkbox,
    createStyles,
    IconButton,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    WithStyles,
    withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import * as TodoActions from '../actions/todo';
import { Todo } from '../model/model';
import { ReactNode } from 'react';

export namespace TodoTable {
    export interface Props extends WithStyles<typeof styles> {
        todoList: Todo[];
        actions: typeof TodoActions;
    }

    export interface State {
        errors: {
            [todoid: number]: {
                [errorKey: string]: string
            },
        };
    }
}

class TodoTable extends React.Component<TodoTable.Props, TodoTable.State> {

    constructor(props: TodoTable.Props) {
        super(props);

        this.initState();
    }

    render(): ReactNode {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="dense">Completed</TableCell>
                            <TableCell padding="dense" className={classes.textColumn}>Text</TableCell>
                            <TableCell padding="dense">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.todoList.map(todo => {

                            return (
                                <TableRow
                                    key={todo.id}
                                    hover
                                >
                                    <TableCell padding="dense" align="left">
                                        <Checkbox
                                            checked={todo.completed}
                                            onChange={e => this.handleCheckboxClick(e, todo)}
                                        />
                                    </TableCell>
                                    <TableCell padding="dense" >
                                        {todo.isBeingEdited ?
                                            <Input
                                                defaultValue={todo.text}
                                                style={{cursor: 'text'}}
                                                onKeyDown={e => this.handleTodoTextKeyPress(e, todo)}
                                                onChange={e => this.handleTodoTextChange(e, todo)}
                                                error={this.getDoesTodoTextInputHaveErrors(todo.id)}
                                                onBlur={e => this.handleTodoTextBlur(e, todo)}
                                                fullWidth
                                                autoFocus
                                            /> :
                                            <span
                                                onClick={() => this.onTodoTextClick(todo)}
                                                onFocus={() => this.handleTodoTextFocus(todo)}
                                                tabIndex={0}
                                            >
                                                {todo.text}
                                            </span>
                                        }
                                    </TableCell>
                                    <TableCell padding="dense" align="right">
                                        <IconButton
                                            aria-label="Delete"
                                            color="default"
                                            onClick={() => this.props.actions.deleteTodo(todo.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    private initState() {
        this.state = {
            errors: {},
        };
    }

    private onTodoTextClick(todo: Todo): void {
        this.enterEditMode(todo);
    }

    private handleTodoTextFocus(todo: Todo) {
        this.enterEditMode(todo);
    }

    private enterEditMode(todo: Todo): void {
        if (todo.isBeingEdited) {
            return;
        }

        this.props.actions.makeTodoEditable(todo.id);
    }

    private getTodoTextInputErrors(todoId: number): { [p: string]: string } | null {
        return this.state.errors[todoId];
    }

    private getDoesTodoTextInputHaveErrors(todoId: number): boolean {
        const errors = this.getTodoTextInputErrors(todoId);

        return Boolean(errors && Object.keys(errors).length > 0);
    }

    private validateTodoText(todo: Todo, updatedTodoText: string) {
        if (!updatedTodoText.length) {
            this.setState(
                {
                    errors: {[todo.id]: {EMPTY_FIELD: 'Please enter a field'}}
                }
            );
        } else {
            const updatedState = {
                ...this.state,
            };

            if (updatedState.errors[todo.id] && updatedState.errors[todo.id].hasOwnProperty('EMPTY_FIELD')) {
                delete updatedState.errors[todo.id].EMPTY_FIELD;
            }

            this.setState(updatedState);
        }
    }

    private handleTodoTextKeyPress(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, todo: Todo): void {
        const updatedTodoText = (e.target as any).value;

        if (e.key === 'Enter') {
            this.handleUserFinishEditingTodo(todo, updatedTodoText);
        }
    }

    private handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>, todo: Todo): void {
        e.stopPropagation();

        if (todo.completed) {
            this.props.actions.uncompleteTodo(todo.id);
        } else {
            this.props.actions.completeTodo(todo.id);
        }
    }

    private handleUserFinishEditingTodo(todo: Todo, updatedTodoText: string): void {
        if (!this.getDoesTodoTextInputHaveErrors(todo.id)) {
            this.props.actions.editTodoText(todo.id, updatedTodoText);
        }
    }

    private handleTodoTextChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, todo: Todo) {
        this.validateTodoText(todo, e.target.value);
    }

    private handleTodoTextBlur(e: any, todo: Todo) {
        const updatedTodoText = (e.target as any).value;

        this.handleUserFinishEditingTodo(todo, updatedTodoText);
    }
}

const styles = () => createStyles(
    {
        paper: {
            width: '100%',
            minWidth: 260,
            display: 'inline-block'
        },
        table: {
            width: '100%'
        },
        textColumn: {
            width: '100%',
        },
    }
);

export default withStyles(styles)(TodoTable);
