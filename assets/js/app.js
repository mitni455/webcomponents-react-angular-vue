/**
 * @todo fake store  
 */
const todoList1 = [
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
];
const todoList2 = [
    {
        id: '4',
        name: 'Signed in',
        isCompleted: true,
        isEditing: false,
    },
    {
        id: '5',
        name: 'Add a new todo',
        isCompleted: false,
        isEditing: false,
    },
];
const todoListStore = {
    male: todoList1,
    female: todoList2
}


/**
 * @var {string} getUserEventName - this is the name we will listen to from the react web component 
 * @description it's like a budget redux action 😂
 **/
const getUserEventName = 'GET_USER_EVENT';

/**
 * @name components/elements
 **/
const reactComponent = document.querySelector('react-component');
const userImg = document.getElementById('user-img');
const userName = document.getElementById('user-name');

/**
 * @tutorial properties
 **/
reactComponent.getUserEventName = getUserEventName;
reactComponent.todoList = [];

/**
 * @tutorial event listener
 * @param {string} getUserEventName - a strongly typed event action name 
 * @default 'GET_USER_EVENT'
 **/
reactComponent.addEventListener(getUserEventName, (evt) => {
    const user = evt.detail;
    userImg.src = user.picture.thumbnail;
    userName.innerText = `${user.name.first} ${user.name.last}`;
    reactComponent.todoList = todoListStore[user.gender];
});
