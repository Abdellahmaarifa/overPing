function toReadonlyArray(source) {
  const clone = [...source];
  Object.freeze(clone);
  return clone;
}
export {
  toReadonlyArray
};
