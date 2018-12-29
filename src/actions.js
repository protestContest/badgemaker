export function setBadgeProps(props) {
  return { type: 'SET_PROPS', payload: props };
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

export function addSave(saveData) {
  return { type: 'ADD_SAVE', payload: saveData };
}

export function restoreSave(badgeData) {
  return { type: 'RESTORE_SAVE', payload: badgeData };
}

export function deleteSave(saveData) {
  return { type: 'DELETE_SAVE', payload: saveData };
}
