import React, { FC, useContext, useState } from 'react';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';

/**
 * @requires TodoMVC 
 */
import todoStyles from 'todomvc-app-css/index.css';

/**
 * @requires Models  
 */
import { Todo } from '../../../common/models/Todo';

/**
 * @requires Components 
 */
import TodoList from '../components/TodoList';

interface IProps {
    imgSrc?: string;
    todoList: Todo[];
    componentTitle: string;
}


/**
 * @name App 
 * @description This is the web component built by Direflow 
 * @param {IProps} props - properties from the web component
 */
const App: FC<IProps> = (props) => {

    /**
     * @description create a dispatch event to fire from 
     * @usage add an event listener to the webcomponent for the event name e.g. reactWebComponent.addEventListener('my-event', handler);
     */
    const dispatchEventOnWebComponent = useContext(EventContext);


    const handleClick = () => {
        const event = new Event('my-event');
        dispatchEventOnWebComponent(event);
    };

    return (
        <Styled styles={[todoStyles, styles]}>

            <div className='app bordered'>

                <TodoList />

            </div>
        </Styled>
    );
};

export default App;
