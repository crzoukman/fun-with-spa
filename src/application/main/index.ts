import { createElement, Routing } from '../../core';
import { Store } from '../../store';
import { Home } from '../home';
import { Tasks } from '../tasks';
import { Test } from '../test';

interface IProps {
  store: Store;
}

export function Main({ store }: IProps) {
  return createElement({
    name: 'main',
    props: {
      className: 'main',
    },
    children: [
      Routing([
        { path: '/', element: Home({ store }) },
        { path: '/test', element: Test() },
      ]),
    ],
  });
}
