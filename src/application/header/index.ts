import { createElement } from '../../core';
import { Store } from '../../store';
import { HeaderAuth } from '../header-auth';
import { Nav } from '../nav';
import './header.css';

interface IProps {
  store: Store;
}

export function Header({ store }: IProps) {
  return createElement({
    name: 'header',
    props: {
      className: 'header',
    },
    children: [
      Nav({ store }),
      store.getState.isAuth && HeaderAuth({ store }),
    ],
  });
}
