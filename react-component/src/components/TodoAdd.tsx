import React, { FC, KeyboardEvent } from 'react';

/**
 * @requires Models 
 */
import { Todo } from '../../../common/models/Todo';

/**
 * @interface IProps 
 */
interface IProps {
    createTodo: (createdTodo: Todo) => void
}


/**
 * @name TodoAdd 
 * @description Add a todo header 
 * @param {IProps} props - includes thw create todo callback from the parent 
 */
const TodoAdd: FC<IProps> = (props) => {


    /**
     * @name createTodoHandler 
     * @description on key press for the new component listen for the neter key, then create a new todo 
     * @param {KeyboardEvent<HTMLInputElement>} evt - keyboard event used to get the value and listen for the enter key 
     */ 
    const createTodoHandler = (evt: KeyboardEvent<HTMLInputElement>) => {

        if(evt.key === 'Enter'){
            
            const timestamp = Date.now().toString();
            const todoName = evt.currentTarget.value;
            
            const todoModel:Todo = {
                id: timestamp,
                name: todoName,
                isCompleted: false,
                isEditing: false,
            }

            props.createTodo(todoModel);
        }
    }
    
    /**
     * @render 
     */
    return (
        <header className="header">
            <input 
                className="new-todo" 
                placeholder="What needs to be done?"
                onKeyPress={createTodoHandler} />
        </header>
    );
}
export default TodoAdd;