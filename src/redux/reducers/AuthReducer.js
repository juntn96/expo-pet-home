initState = {
  userData: null
}
const AuthReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN': {
      console.log('>>>>')
      console.log(action.payload)
      console.log('-----')
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