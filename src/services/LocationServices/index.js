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

const getSuggestLocation = async () => {
  try {
    const url = API_URL + 'location/getAllActiveLocation';
    const result = await axios.get(url);
    return result.data.locations;
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

const searchLocation = async data => {
  try {
    const url = API_URL + 'location/searchAllLocations';
    const result = await axios.get(url, {
      params: {
        search_keyword: data.textSearch
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

const getLocationDetail = async data => {
  try {
    const url = API_URL + 'location/locationProduct';
    const result = await axios.get(url, {
      params: {
        _id: data._id,
        ownerId: data.ownerId
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      } 
    });
    return result.data.locationDetail;
  } catch (error) {
    throw error;
  }
};

export default {
  getLocation,
  getLocationByCategory,
  searchLocation,
  getSuggestLocation,
  getLocationDetail
};
