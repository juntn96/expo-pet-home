const notificationReducer = (state = null, { type, payload }) => {
  switch (type) {
    case "PUSH": {
      return payload;
    }
    case "CLEAR": {
      return null;
    }
    default: {
      return state;
    }
  }
};
