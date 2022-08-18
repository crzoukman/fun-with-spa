const store = [] as any;
let idx = 0;

export function useStateWR<T>(initial: T) {
  const state = store[idx] || initial;
  const _idx = idx;

  function setState(value: T) {
    store[_idx] = value;
  }

  function getState() {
    return store[_idx];
  }

  idx++;

  return [getState, setState];
}

export function resetIdxWR() {
  idx = 0;
}
