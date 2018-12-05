import ApiServices from "../ApiServices";
import axios from "axios";
import { API_URL } from "../../constants/config";

const getLocation = async userLocation => {
  const url = `location/searchDist/${userLocation.longitude}/${userLocation.latitude}/${userLocation.radius}`;
  try {
    const result = await ApiServices.get(url);
    return result.listLocation;
  } catch (error) {
    throw error;
  }
};

export default {
  getLocation,
};
