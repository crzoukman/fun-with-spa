import { createElement } from '../../core';
import { Store } from '../../store';
import { Header } from '../header';
import { Main } from '../main';
import { Modal } from '../modal';

interface IProps {
  store: Store;
}

export function App({ store }: IProps) {
  return createElement({
    name: 'div',
    props: {
      className: 'app',
    },
    children: [
      Header({ store }),
      Main({ store }),
      store.getState.isModalOpen && Modal({ store }),
    ],
  });
}
