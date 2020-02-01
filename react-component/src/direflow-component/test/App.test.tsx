import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App, {IAppProps} from '../App';

const reactProps:IAppProps = {
  btnTitle: 'Component Test',
  todoList: [
    {
      id: '1',
      name: 'Test todo',
      isCompleted: false,
      isEditing: false
    }
  ],
  getUserEventName: 'Login'
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App {...reactProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('matches snapshot as expected', () => {
  const renderTree = renderer.create(<App {...reactProps} />).toJSON();
  expect(renderTree).toMatchSnapshot();
});
