import PostActionTypes from "../types/PostActionTypes";

export const getPost = type => {
  return {
    type: PostActionTypes.GET_POST,
    payload: type,
  };
};

export const getSuccess = postData => {
  return {
    type: PostActionTypes.GET_SUCCESS,
    payload: postData,
  };
};

export const getFailed = () => {
  return {
    type: PostActionTypes.GET_FAILED,
  };
};
