import { createElement, useState } from '../../core';
import './test.css';

interface IProps {}

export function Test() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  return createElement({
    name: 'div',
    props: {
      className: 'test',
    },
    children: [
      Wrapper(
        Counter1({ counter1 }),
        Increment({ counter1, setCounter1 }),
      ),
      Wrapper(
        Counter2({ counter2 }),
        Decrement({ counter2, setCounter2 }),
      ),
    ],
  });
}

function Wrapper(...children: HTMLElement[]) {
  return createElement({
    name: 'div',
    props: {
      className: 'test__wrapper',
    },
    children: [...children],
  });
}

function Counter1({ counter1 }: { counter1: number }) {
  return createElement({
    name: 'h1',
    props: {
      textContent: `${counter1}`,
    },
  });
}

function Increment({
  counter1,
  setCounter1,
}: {
  counter1: number;
  setCounter1: (arg: number) => void;
}) {
  return createElement({
    name: 'button',
    props: {
      textContent: 'Inc',
      className: 'text__btn',
    },
    events: [
      {
        type: 'click',
        callback: () => {
          setCounter1(counter1 + 1);
        },
      },
    ],
  });
}

function Counter2({ counter2 }: { counter2: number }) {
  return createElement({
    name: 'h1',
    props: {
      textContent: `${counter2}`,
    },
  });
}

function Decrement({
  counter2,
  setCounter2,
}: {
  counter2: number;
  setCounter2: (arg: number) => void;
}) {
  return createElement({
    name: 'button',
    props: {
      textContent: 'Dec',
      className: 'text__btn',
    },
    events: [
      {
        type: 'click',
        callback: () => {
          setCounter2(counter2 - 1);
        },
      },
    ],
  });
}
