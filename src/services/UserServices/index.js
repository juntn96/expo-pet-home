import ApiServices from "../ApiServices";

const UserServices = {
  login: async userData => {
    try {
      const method = "POST";
      const funcUrl = "app/user/add";
      const data = await ApiServices.requestOption(method, funcUrl, userData);
      return data.result;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
