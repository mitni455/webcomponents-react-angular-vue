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
import { Todo, User } from '../../../common/models/index';

/**
 * @requires Components 
 */
import TodoList from '../components/TodoList';

/**
 * @requires Components 
 */
import {getUser} from '../services/user.service';

/**
 * @interface IAppProps
 * @param {string} getUserEventName - event name that we will use to publish an event 
 */
export interface IAppProps {
    btnTitle: string;
    todoList: Todo[];
    getUserEventName: string
}


/**
 * @name App 
 * @description This is the web component built by Direflow 
 * @param {IAppProps} props - properties from the web component
 */
const App: FC<IAppProps> = (props) => {

    const [btnTitle, setBtnTitle] = useState(props.btnTitle);

    /**
     * @name dispatchEventOnWebComponent - you can name this what you want. its a hook to fire an event on the webcomponent 
     * @description create a dispatch event to fire from 
     * @usage add an event listener to the webcomponent for the event name e.g. reactWebComponent.addEventListener('my-event', handler);
     */
    const dispatchEventOnWebComponent = useContext(EventContext);


    /**
     * @name btnGetUser
     * @description expose an event on the WebComponent so it can be listened to via HTML 
     * @param {React.MouseEvent<HTMLButtonElement>} evt - event from btnGetUser click 
     * @emits Event - a VanillaJs event for our webcomponent 
     */
    const btnGetUser = async (evt: React.MouseEvent<HTMLButtonElement>) => {
        
        setBtnTitle('Loading...'); 

        try{
            /**
             * @tutorial fetch user 
             */
            const user = await getUser();

            /**
             * @tutorial dispatch event and publish on the webcomponent 
             * @description using CustomEvent we can pass custom data in the event.detail param
             * @usage reactWebComponent.addEventListener(getUserEventName, (evt)=>{ const user = evt.detail; })
             */
            const event = new CustomEvent<User>(props.getUserEventName, {detail:user});
            dispatchEventOnWebComponent(event);

            /**
             * @tutorial reset Set button label 
             */
            setBtnTitle(`Welcome ${user.name.first} ${user.name.last} `)
            //setTimeout(()=>{setBtnTitle(props.btnTitle);}, 1000);
            
        }
        catch(err){
            /**
             * @tutorial reset Set button label on error 
             */
            console.log(`💀 💩 UserService.getUser error:`, err.message);
            setBtnTitle('💀 💩 Failed 💀 💩 '); 
            setTimeout(()=>{setBtnTitle(props.btnTitle)}, 1000);
        }
    };

    return (
        <Styled styles={[todoStyles, styles]}>

            <div className='app bordered'>
                
                <TodoList todoList={props.todoList} />

                <button className='btn-get-user' onClick={btnGetUser}>
                    {btnTitle}
                </button>

            </div>
        </Styled>
    );
};

export default App;
