import axios from "axios";
import { API_URL } from "../constants/config";

const ApiServices = {
  get: async funcUrl => {
    try {
      const url = API_URL + funcUrl;
      const method = "GET";
      const result = await axios({
        method,
        url,
        responseType: "json",
        timeout: 30000
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  requestOption: async (method, funcUrl, data = {}) => {
    try {
      const url = API_URL + funcUrl;
      const result = await axios({
        method,
        url,
        data,
        responseType: "json",
        timeout: 30000,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiServices;
