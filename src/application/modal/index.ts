import axios from 'axios';
import {
  createElement,
  useState,
  useStateWR,
} from '../../core';

import { Store } from '../../store';
import './modal.css';

interface IProps {
  store: Store;
}

export function Modal({ store }: IProps) {
  return createElement({
    name: 'div',
    props: {
      className: 'modal',
    },
    children: [Window({ store })],
    events: [
      {
        type: 'click',
        callback: () => {
          store.setIsModalOpen(false);
        },
      },
    ],
  });
}

function Window({ store }: IProps) {
  const [title, setTitle] = useState('') as [
    string,
    (arg: string) => void,
  ];

  return createElement({
    name: 'div',
    props: {
      className: 'modal__window',
    },
    children: [
      Title(setTitle, title),
      OK({ store, title, setTitle }),
    ],
    events: [
      {
        type: 'click',
        callback: (e) => e.stopPropagation(),
      },
    ],
  });
}

function Title(
  setTitle: (arg: string) => void,
  title: string,
) {
  return createElement({
    name: 'input',
    props: {
      className: 'modal__title',
      placeholder: 'type a title here',
      value: title,
      focus: true,
    },
    events: [
      {
        type: 'input',
        callback: (e) => {
          const value = (e.target as HTMLInputElement)
            .value;

          setTitle(value);
        },
      },
    ],
  });
}

function OK({
  store,
  title,
  setTitle,
}: IProps & {
  title: string;
  setTitle: (arg: string) => void;
}) {
  return createElement({
    name: 'button',
    props: {
      textContent: 'OK',
      className: 'modal__ok',
      disabled: title.trim() === '',
    },
    events: [
      {
        type: 'click',
        callback: () => {
          if (title?.trim()) {
            (async () => {
              const result = await axios.post(
                `https://jsonplaceholder.typicode.com/users`,
                {
                  title: title,
                  completed: false,
                },
              );

              setTitle('');

              store.setTasks([
                ...store.getState.tasks,
                result.data,
              ]);

              store.setShowSuccessAlert(true);
              store.setIsModalOpen(false);

              setTimeout(
                () => store.setShowSuccessAlert(false),
                2000,
              );
            })();
          }
        },
      },
    ],
  });
}
