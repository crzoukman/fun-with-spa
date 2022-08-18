import { createElement } from '../../core';
import { Store } from '../../store';
import { Login } from '../login';
import { Tasks } from '../tasks';

interface IProps {
  store: Store;
}

export function Home({ store }: IProps) {
  return createElement({
    name: 'section',
    children: [
      store.getState.isAuth
        ? Tasks({ store })
        : Login({ store }),
    ],
  });
}
