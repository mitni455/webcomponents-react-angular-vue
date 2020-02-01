import React, { FC, ChangeEvent, useState, KeyboardEvent } from 'react';

/**
 * @requires Todo Model 
 */
import { Todo } from '../../../common/models/Todo';

/**
 * @description TodoRow Properties
 * @export
 * @interface ITodoRowProps
 */
export interface ITodoRowProps {
    todo: Todo;
    updateTodo: (todo: Todo) => void,
    destroyTodo: (todo: Todo) => void,
}

/**
 * @name TodoRow 
 * @description Row for one todo item 
 * @param props - todo list passed as prop
 * @export 
 * @returns {FC} TodoRow 
 **/
const TodoRow: FC<ITodoRowProps> = (props: ITodoRowProps) => {

    const { todo } = props;
    const [ editName, setEditName ] = useState(todo.name);
    const txtEdit =  React.createRef<HTMLInputElement>();

    /** 
     * @name toggleIsCompleted
     * @description on toggle todo pass to props toggle function 
     * @param {ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLabelElement, MouseEvent>} evt - Change event or Mouse click event 
     * @event ChangeEvent 
     */
    const toggleIsCompleted = (evt: ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        const updatedTodo = { ...todo };
        updatedTodo.isCompleted = !todo.isCompleted; //evt.target.checked;
        props.updateTodo(updatedTodo);
    }
    
    
    /** 
     * @name onEditChange
     * @description handler for updating the edit textbox 
     * @param {ChangeEvent<HTMLInputElement>} evt - Change event 
     * @event ChangeEvent 
     */
    const onEditChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setEditName(evt.currentTarget.value);
    }
    
    
    /**
     * @name onEditKeypress 
     * @description on key pressed for the edit textbox 
     * @param {KeyboardEvent<HTMLInputElement>} evt - keyboard event used to get the value and listen for the enter key 
     */ 
    const onEditKeypress = (evt: KeyboardEvent<HTMLInputElement>) => {

        setEditName(evt.currentTarget.value);
        
        if(evt.key === 'Enter'){
            const updatedTodo = { ...todo };
            updatedTodo.name = editName;
            updatedTodo.isEditing = false;
            props.updateTodo(updatedTodo);
        }
    }

    /** 
     * @name toggleEditMode
     * @description click handler for toggling edit mode 
     * @param {React.MouseEvent<HTMLLabelElement, MouseEvent>} evt - Change event 
     * @event React.MouseEvent 
     */
    const toggleEditMode = (evt: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        const updatedTodo = { ...todo };
        updatedTodo.isEditing = !todo.isEditing;

        /**
         * @hack 
         * @tutorial hack to get focus working 
         */
        const tempTxtEdit:HTMLInputElement|null = txtEdit.current;
        if(updatedTodo.isEditing && txtEdit.current) {
            setTimeout(()=>{
                if(tempTxtEdit) tempTxtEdit.select();
            }, 100)
        }

        props.updateTodo(updatedTodo);
    }

    /**
     * @name onBlur 
     * @description on blur turn off edit mode 
     * @param evt - blur event 
     * @event
     */
    const onBlur = (evt:React.FocusEvent<HTMLInputElement>) => {
        const updatedTodo = { ...todo };
        updatedTodo.isEditing = false;
        props.updateTodo(updatedTodo);
    }

    /**
     * @name btnDestroyClick
     * @description Destroy btn handler 
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} evt - click event 
     * @event
     */
    const btnDestroyClick = (evt:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.destroyTodo(todo);
    }
    
    /**
     * @render 
     */
    const classes:string = [
        todo.isCompleted ? 'completed' : '',
        todo.isEditing ? 'editing' : '',
    ].join(' ');
    return (
        <li className={classes}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={todo.isCompleted} onChange={toggleIsCompleted} />
                {/* <label onClick={toggleIsCompleted} onDoubleClick={toggleEditMode}> */}
                <label onClick={toggleEditMode}>
                    {todo.name}
                </label>
                <button className="destroy" onClick={btnDestroyClick}></button>
            </div>
            <input ref={txtEdit} className="edit" value={editName} onKeyPress={onEditKeypress} onChange={onEditChange} onBlur={onBlur} onClick={e=>txtEdit.current!.select()} />
        </li>
    );
}

export default TodoRow;