'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoard from './KanbanBoard'; 

let cardsList = [
  {
    id: 1,
    title: "Do some task",
    description: "Do the task well, and stuff.",
    color: '#BD8D31',
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Do some other task",
    description: "Do the task well, and stuff.",
    color: '#3A7E28',
    status: "in-progress",
    tasks: [
      {
        id: 1,
        name: "Some sub-task",
        done: true
      },
      {
        id: 2,
        name: "Some other sub-task",
        done: false
      }
    ]
  },
  {
    id: 3,
    title: "Fun task 241513",
    description: "ITS SO FUN.",
    color: '#BD8D31',
    status: "todo",
    tasks: []
  },
];

ReactDOM.render((<KanbanBoard cards={cardsList} />), document.getElementById('root'));
