initState = {
  userData: null
}
const AuthReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN': {
      return {
        ...state,
        userData: action.payload
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        userData: null
      }
    }
    default: {
      return state;
    }
  }
}

export default AuthReducer;