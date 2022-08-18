import { createElement } from '../../core';
import { Store } from '../../store';
import './login.css';

interface IProps {
  store: Store;
}

export function Login({ store }: IProps) {
  return createElement({
    name: 'form',
    props: {
      className: 'login-form',
    },
    children: [
      usernameInput({ store }),
      passwordInput({ store }),
      submitButton(),
    ],
    events: [
      {
        type: 'submit',
        callback: (e) => {
          e.preventDefault();

          const children = Array.from(
            (e.target as HTMLFormElement).children,
          );

          const formData = {
            username: '',
            password: '',
          };

          for (const child of children) {
            if (child.tagName.toLowerCase() === 'input') {
              const input = child as HTMLInputElement;

              if (input.type === 'text') {
                formData.username = input.value;
              }

              if (input.type === 'password') {
                formData.password = input.value;
              }
            }
          }

          store.login(formData);
        },
      },
    ],
  });
}

function usernameInput({ store }: IProps) {
  return createElement({
    name: 'input',
    props: {
      placeholder: 'slacker',
      type: 'text',
      value: store.getState.username,
      className: 'login-form__input',
    },
  });
}

function passwordInput({ store }: IProps) {
  return createElement({
    name: 'input',
    props: {
      placeholder: 'qwerty123',
      type: 'password',
      value: store.getState.password,
      className: 'login-form__input',
    },
  });
}

function submitButton() {
  return createElement({
    name: 'button',
    props: {
      textContent: 'Log in',
      type: 'submit',
      className: 'login-form__submit',
    },
  });
}
