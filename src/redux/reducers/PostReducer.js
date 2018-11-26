import PostActionTypes from "../types/PostActionTypes";

const initialState = {
  postData: [],
  postType: "all",
  loading: false,
  error: false,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PostActionTypes.GET_POST: {
      return {
        ...state,
        postType: payload,
        loading: true,
      };
    }
    case PostActionTypes.GET_SUCCESS: {
      return {
        ...state,
        postData: payload,
        loading: false,
      };
    }
    case PostActionTypes.GET_FAILED: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
