import ApiServices from "../ApiServices";
import axios from "axios";
import { API_URL } from "../../constants/config";
import qs from "qs";

const getLocation = async userLocation => {
  const url = `location/searchDist/${userLocation.longitude}/${
    userLocation.latitude
  }/${userLocation.radius}`;
  try {
    const result = await ApiServices.get(url);
    return result.listLocation;
  } catch (error) {
    throw error;
  }
};

const getSuggestLocation = async () => {
  try {
    const url = API_URL + "location/getAllActiveLocation";
    const result = await axios.get(url);
    return result.data.locations;
  } catch (error) {
    throw error;
  }
};

const getLocationCategoryWithType = async () => {
  try {
    const url = API_URL + "location/locationCategoriesWithType";
    const result = await axios.get(url);
    return result.data.locationCategories;
  } catch (error) {
    throw error;
  }
};

const getLocationByCategory = async data => {
  try {
    const url = API_URL + "location/locationByCategory";
    const result = await axios.get(url, {
      params: {
        typeIdArray: data.typeIdArray,
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return result.data.listLocations;
  } catch (error) {
    throw error;
  }
};

const searchLocation = async data => {
  console.log(data.typeIdArray)
  let newtypeIdArray = []
  if(data.typeIdArray.length > 0) {
    newtypeIdArray = data.typeIdArray.map(item => {return {typeId: item._id}});
  }
  console.log("newtypeIdArray");
  console.log(newtypeIdArray);
  try {
    const url = API_URL + "location/searchAllLocations";
    const result = await axios.get(url, {
      params: {
        search_keyword: data.textSearch,
        lat: data.lat,
        long: data.long,
        radius: data.radius,
        ratingGt: data.ratingGt,
        ratingLt: data.ratingLt,
        typeIdArray: newtypeIdArray
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return result.data.listLocations;
  } catch (error) {
    throw error;
  }
};

const searchAllLocation = async () => {
  try {
    const url = API_URL + "location/getAllActiveLocation";
    const result = await axios.get(url);
    return result.data.locations;
  } catch (error) {
    throw error;
  }
};

const getLocationDetail = async data => {
  try {
    const url = API_URL + "location/locationProduct";
    const result = await axios.get(url, {
      params: {
        _id: data._id,
        ownerId: data.ownerId,
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return result.data.locationDetail;
  } catch (error) {
    throw error;
  }
};

const getReview = async locationId => {
  try {
    const url = `location/review/${locationId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const addReview = async review => {
  try {
    const url = `location/review/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, review);
    return data.result;
  } catch (error) {
    throw error;
  }
};

export default {
  getLocation,
  getLocationByCategory,
  getLocationCategoryWithType,
  searchLocation,
  getSuggestLocation,
  getLocationDetail,
  searchAllLocation,
  getReview,
  addReview,
};
