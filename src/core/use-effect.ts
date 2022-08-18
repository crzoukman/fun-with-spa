let hasBeenInitialized = false;

export function useEffect(callback: () => void) {
  if (!hasBeenInitialized) {
    callback();
    hasBeenInitialized = true;
  }
}
