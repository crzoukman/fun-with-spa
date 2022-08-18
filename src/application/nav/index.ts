import { createElement } from '../../core';
import { Store } from '../../store';
import './nav.css';

interface IProps {
  store: Store;
}

const links = [
  { title: 'Home', path: '/' },
  { title: 'useState', path: '/test' },
];

export function Nav({ store }: IProps) {
  return createElement({
    name: 'ul',
    props: {
      className: 'nav',
    },
    children: [
      ...links.map((link) =>
        createElement({
          name: 'li',
          props: {
            className: 'nav__link',
            textContent: link.title,
          },
          events: [
            {
              type: 'click',
              callback: () => store.setPath(link.path),
            },
          ],
        }),
      ),
    ],
  });
}
