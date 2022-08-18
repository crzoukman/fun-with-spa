import { store } from '..';

export function Routing(routes: IRoute[]) {
  for (const route of routes) {
    if (route.path === store.getState.path) {
      return route.element;
    }
  }

  throw new Error('[Routing]: No path is matching');
}

interface IRoute {
  path: string;
  element: HTMLElement;
}
