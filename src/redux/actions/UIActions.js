export const toggle = toast => {
  return {
    type: "TOGGLE",
    payload: toast
  }
}

export const clear = () => {
  return {
    type: "CLEAR"
  }
}