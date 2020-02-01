import { DireflowComponent } from 'direflow-component';
import App from './direflow-component/App';

/**
 * @requires Todo Model 
 */
import { Todo } from '../../common/models/Todo';
const todoList: Todo[] = [
    {
        id: 'task1',
        name: 'Create React Web Component',
        isCompleted: true,
        isEditing: false,
    },
    {
        id: 'task2',
        name: 'Create Angular Web Component',
        isCompleted: false,
        isEditing: false,
    },
    {
        id: 'task3',
        name: 'Create Vue Web Component',
        isCompleted: false,
        isEditing: false,
    },

]

const direflowComponent = new DireflowComponent();
const direflowProperties = {
    imgSrc: 'https://scontent-syd2-1.xx.fbcdn.net/v/t31.0-8/13235267_10154099016185120_7538330398459466969_o.jpg?_nc_cat=103&_nc_ohc=L_M1-fVfzt0AX9I6eeo&_nc_ht=scontent-syd2-1.xx&oh=b4e519e279b6a2c9f9deb723e005d8c3&oe=5ECC4F32',
    componentTitle: 'React Component',
    todoList
};

const direflowPlugins = [
    {
        name: 'font-loader',
        options: {
            google: {
                families: ['Advent Pro', 'Noto Sans JP'],
            },
        },
    },
];

/**
 * @name config 
 * @description This is the equivalent of the createElement() function in html
 * @param name - this is the name of the component. To use this component we add <react-component></react-component> to the html
 * @usage <react-component></react-component>
 */
direflowComponent.configure({
    name: 'react-component',
    useShadow: true,
    properties: direflowProperties,
    plugins: direflowPlugins,
});

direflowComponent.create(App);
