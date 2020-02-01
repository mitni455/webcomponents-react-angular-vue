import React, { FC, useState } from 'react';

/**
 * @requires Models 
 */
import { Todo } from '../../../common/models/Todo';
/**
 * @requires Components
 */


/**
 * @interface IProps 
 */
interface IProps {
    todoList: Todo[],
    clearAll: ()=>void
}


/**
 * @name TodoFooter 
 * @description This is the web component built by Direflow 
 * @param {IProps} props - properties from the web component
 */
const TodoFooter: FC<IProps> = (props) => {

    const todoList = props.todoList; 
    const todoCount = props.todoList.filter(t => t.isCompleted !== true).length;

    /** 
    * @name btnClearClick
    * @description click handler 
    * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} evt - Change event 
    * @event React.MouseEvent 
    */
    const btnClearClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.clearAll();
    }

    /**
     * @name render 
     * @description Todo Footer 
     */
    return (
        <footer className="footer">
            <span className="todo-count"><strong>{todoCount}</strong> item{todoCount>1 ? 's':''} left</span>
            <button className="clear-completed" onClick={btnClearClick}>Clear completed</button>
        </footer>
    );
};

export default TodoFooter;
