function tryCatch(fn, onException) {
  try {
    const result = fn();
    return result;
  } catch (error) {
    onException == null ? void 0 : onException(error);
  }
}
export {
  tryCatch
};
