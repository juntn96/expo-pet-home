initState = {
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
      console.log('aaa')
      return {
        state: null
      }
    }
    default: {
      return state;
    }
  }
}

export default AuthReducer;