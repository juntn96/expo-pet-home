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

export default {
  getPostCategories,
  createPost,
};
