import { DireflowComponent } from 'direflow-component';
import App from './direflow-component/App';

/**
 * @requires Todo Model 
 */
import { Todo } from '../../common/models/Todo';

/**
 * @interface IDireflowProps
 */
interface IDireflowProps{
    componentTitle: string;
    todoList: Todo[]
}
/**
 * @name Properties 
 */
const direflowProperties:IDireflowProps = {
    componentTitle: 'React Web Component',
    todoList: []
};

/**
 * @name Plugins 
 */
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
 * @name WebComponent 
 */
const direflowComponent = new DireflowComponent();

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
