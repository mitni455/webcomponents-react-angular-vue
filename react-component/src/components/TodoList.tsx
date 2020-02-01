import React, { FC, useState } from 'react';

/**
 * @requires Models 
 */
import { Todo } from '../../../common/models/Todo';
/**
 * @requires Components
 */
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import TodoFooter from './TodoFooter';

/**
 * @interface IProps 
 */
interface IProps {

}


/**
 * @name TodoList 
 * @description This is the web component built by Direflow 
 * @param {IProps} props - properties from the web component
 */
const TodoList: FC<IProps> = (props) => {

    const [todoList, setTodoList] = useState<Todo[]>([
        {
            id: '1',
            name: 'Completed task',
            isCompleted: true,
            isEditing: false,
        },
        {
            id: '2',
            name: 'Incomplete task',
            isCompleted: false,
            isEditing: false,
        },
        {
            id: '3',
            name: 'Editable task',
            isCompleted: false,
            isEditing: false,
        },
    ]);
    
    /**
     * @name createTodo 
     * @description create a new Todo model and add to list 
     * @param {Todo} updatedTodo - updated todo model 
     */ 
    const createTodo = (createdTodo:Todo) => {

        /**
         * @tutorial create immutable copy  
         */
        const updatedTodoList = [...todoList];

        /**
         * @tutorial add new todo model 
         */
        updatedTodoList.push(createdTodo);

        /**
         * @tutorial update the state 
         */
        setTodoList(updatedTodoList);
    }
    
    /**
     * @name updateTodo 
     * @description on Todo item toggled, update the sate management  
     * @param {Todo} updatedTodo - updated todo model 
     */ 
    const updateTodo = (updatedTodo:Todo) => {

        /**
         * @tutorial get a new list without the updated todo model. Then make an immutable copy.
         */
        const updatedTodoList = [...todoList.filter(t => t.id !== updatedTodo.id)];
        
        /**
         * @tutorial make an immutable copy fo the Todo model to be added. Since we have already done this, lets comment out this line  
         */
        // const todoModel:Todo = {...updatedTodo};

        /**
         * @tutorial create a combined state with new model and sort it so it remains in the coreect order 
         */
        const updatedState:Todo[] = [
            ...updatedTodoList,
            updatedTodo
        ]
        updatedState.sort((a:Todo,b:Todo)=> parseInt(a.id) - parseInt(b.id));

        /**
         * @tutorial update the state 
         */
        setTodoList(updatedState);
    }

    /**
     * @name destroyTodo
     * @description remove todo from list
     */
    const destroyTodo = (updatedTodo:Todo) => {

        /**
         * @tutorial get a new list without the updated todo model. Then make an immutable copy.
         */
        const updatedTodoList = [...todoList.filter(t => t.id !== updatedTodo.id)];

        /**
         * @tutorial update the state 
         */
        setTodoList(updatedTodoList);

    }

    /**
     * @name clearAll
     * @description remove all completed todos from list
     */
    const clearAll = () => {
        
        /**
         * @tutorial get a new list without the updated todo model. Then make an immutable copy.
         */
        const updatedTodoList = [...todoList.filter(t => t.isCompleted !== true)];

        /**
         * @tutorial update the state 
         */
        console.table(updatedTodoList);
        setTodoList(updatedTodoList);

    }

    /**
     * @name render 
     * @description Todo app 
     */
    return (
        <section className="todoapp">

            {/** 
              * @name header 
              * @description Add a new Todo  
             **/}
            <TodoAdd createTodo={createTodo}></TodoAdd>
            
            {/** 
              * @name main 
              * @description Add a new Todo  
             **/}
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox" />
                    
                <label htmlFor="toggle-all">
                    Mark all as complete
                </label>

                <ul className="todo-list">

                    {todoList.map(todo => 
                        (<TodoRow key={todo.id} todo={todo} updateTodo={updateTodo} destroyTodo={destroyTodo} ></TodoRow>)
                    )}
                        
                </ul>
            </section>

            {/** 
              * @name footer
              * @description filters and summary count 
             **/}
            <TodoFooter todoList={todoList} clearAll={clearAll}></TodoFooter>

        </section>
    );
};

export default TodoList;
