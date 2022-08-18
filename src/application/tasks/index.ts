import axios from 'axios';
import {
  createElement,
  useEffect,
  useState,
} from '../../core';
import { Store } from '../../store';
import './tasks.css';

interface IProps {
  store: Store;
}

export function Tasks({ store }: IProps) {
  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/users/1/todos?_start=0&_limit=10`,
      );

      store.setTasks(result.data);
    })();
  });

  return createElement({
    name: 'div',
    props: {
      className: 'tasks',
    },
    children: [
      AddTask(store.setIsModalOpen.bind(store)),
      TaksList(store.getState.tasks, store),
      store.getState.showSuccessAlert && Alert(),
    ],
  });
}

function Alert() {
  return createElement({
    name: 'div',
    props: {
      className: 'tasks__alert',
      textContent: 'A task has been added!',
    },
  });
}

function AddTask(setIsModalOpen: (arg: boolean) => void) {
  return createElement({
    name: 'button',
    props: {
      className: 'tasks__add-btn',
      textContent: 'Add task',
    },

    events: [
      {
        type: 'click',
        callback: () => {
          setIsModalOpen(true);
        },
      },
    ],
  });
}

function TaksList(tasks: ITask[], store: Store) {
  return createElement({
    name: 'ul',
    props: {
      className: 'tasks__task-list',
    },
    children: [...tasks.map((task) => Task(task, store))],
  });
}

function Task(task: ITask, store: Store) {
  return createElement({
    name: 'li',
    props: {
      className: 'tasks__item',
      style: {
        borderLeft: `2px solid ${
          task.completed ? 'blue' : 'red'
        }`,
      },
    },
    children: [
      ItemContent(task),
      !task.completed && Complete(task, store),
    ],
  });
}

function ItemContent(task: ITask) {
  return createElement({
    name: 'span',
    props: {
      textContent: `${task.title}`,
    },
    children: [],
  });
}

function Complete(data: ITask, store: Store) {
  return createElement({
    name: 'button',
    props: {
      textContent: 'Complete',
      className: 'tasks__complete',
    },
    events: [
      {
        type: 'click',
        callback: () => {
          store.complete(data);
        },
      },
    ],
  });
}

interface ITask {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
