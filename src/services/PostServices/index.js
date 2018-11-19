import ApiServices from "../ApiServices";
import ImageServers from "../ImageServices";

const getPostCategories = async () => {
  try {
    const url = "post/category/get";
    const data = await ApiServices.get(url);
    return data.categories;
  } catch (error) {
    throw error;
  }
};

const createPost = async postData => {
  try {
    const url = "post/add";
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, postData);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const url = `post/get`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPostByType = async typeId => {
  try {
    const url = `post/get/${typeId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPostByOwner = async ownerId => {
  try {
    const url = `post/${ownerId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getVote = async (postId, voteType) => {
  try {
    const url = `post/vote/get?postId=${postId}&voteType=${voteType}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const vote = async voteData => {
  try {
    const url = `post/vote`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, voteData);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const report = async report => {
  try {
    const url = `post/report/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, report);
    return data.result;
  } catch (error) {
    throw error;
  }
};

export default {
  getPostCategories,
  createPost,
  getPostByType,
  getPostByOwner,
  getAll,
  vote,
  getVote,
  report
};
