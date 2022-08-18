import { App } from './application/app';
import { resetIdx, resetIdxWR } from './core';
import { Store } from './store';
import './global.css';

interface IProps {
  where: HTMLElement;
  what: HTMLElement;
}

const root = document.querySelector(
  'body',
) as HTMLBodyElement;

export const store = new Store({
  path: '/',
  username: 'slacker',
  password: 'qwerty123',
  isAuth: false,
  isModalOpen: false,
  tasks: [],
  showSuccessAlert: false,
});

function render({ where, what }: IProps) {
  while (where.lastChild) {
    where.removeChild(where.lastChild);
  }

  where.append(what);
}

export function init() {
  resetIdx();
  resetIdxWR();

  render({
    where: root,
    what: App({ store }),
  });
}

store.subscribeInit(init);

init();
