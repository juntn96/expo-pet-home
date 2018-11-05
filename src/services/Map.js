import Polyline from "@mapbox/polyline";
import * as Strings from "../constants/strings";

export const GoogleMap = {
  getDirections: async (startLoc, destinationLoc) => {
    try {
      const start = startLoc.latitude + ", " + startLoc.longitude
      const destination = destinationLoc.latitude + ", " + destinationLoc.longitude
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${destination}&key=${Strings.MAP_API_KEY}`);
      let respJson = await resp.json();
      // console.log('1: ', respJson)
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      // console.log('2: ', points)
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords;
    } catch (error) {
      console.log("Map Error")
      console.log(error)
      return null;
    }
  },
};
