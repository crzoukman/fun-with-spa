import { createElement } from '../../core';
import { Store } from '../../store';
import './header-auth.css';

interface IProps {
  store: Store;
}

export function HeaderAuth({ store }: IProps) {
  return createElement({
    name: 'div',
    props: {
      className: 'header__auth',
    },
    children: [Name({ store }), Logout({ store })],
  });
}

function Name({ store }: IProps) {
  return createElement({
    name: 'div',
    props: {
      textContent: `Hello, ${store.getState.username}!`,
    },
    children: [],
  });
}

function Logout({ store }: IProps) {
  return createElement({
    name: 'button',
    props: {
      className: 'header__auth-button',
      textContent: `Log out`,
    },
    events: [
      {
        type: 'click',
        callback: () => store.setIsAuth(false),
      },
    ],
  });
}
