export function setState(item) {
  return { type: 'SET_PROP', payload: item };
}

export function openPicker(id) {
  return { type: 'OPEN_PICKER', payload: id };
}

export function closePicker() {
  return { type: 'CLOSE_PICKER' };
}

export function reset() {
  localStorage.clear();
  return { type: 'RESET' };
}

export function adjustImage(newPosition) {
  return { type: 'ADJUST_IMAGE', payload: newPosition };
}
