export const stopPropagation = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  e.nativeEvent.stopImmediatePropagation();
  e.nativeEvent.preventDefault();
};