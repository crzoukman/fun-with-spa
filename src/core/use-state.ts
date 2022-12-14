import { init } from '..';

const store = [] as any;
let idx = 0;

export function useState<T>(initial: T) {
  const state = store[idx] || initial;
  const _idx = idx;

  function setState(value: T) {
    store[_idx] = value;

    init();
  }

  idx++;

  return [state, setState];
}

export function resetIdx() {
  idx = 0;
}
