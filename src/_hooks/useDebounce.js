/**
 * Debounce
 * @param {function} fun function
 * @param {number} timeout
 * @returns function
 */
const useDebounce = (func, timeout = 200) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, timeout);
  };
};

export default useDebounce;
