import ApiServices from "../ApiServices";
import axios from "axios";
import { API_URL } from "../../constants/config";
import qs from 'qs';

const getLocation = async userLocation => {
  const url = `location/searchDist/${userLocation.longitude}/${userLocation.latitude}/${userLocation.radius}`;
  try {
    const result = await ApiServices.get(url);
    return result.listLocation;
  } catch (error) {
    throw error;
  }
};

const getLocationByCategory = async data => {
  try {
    const url = API_URL + 'location/locationByCategory';
    const result = await axios.get(url, {
      params: {
        typeIdArray: data.typeIdArray
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      } 
    });
    return result.data.listLocations;
  } catch (error) {
    throw error;
  }
};

export default {
  getLocation,
  getLocationByCategory,
};
