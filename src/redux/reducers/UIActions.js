export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case "TOGGLE": {
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