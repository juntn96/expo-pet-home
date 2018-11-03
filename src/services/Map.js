import Polyline from "@mapbox/polyline";
import * as Strings from "../constants/strings";

export const GoogleMap = {
  getDirections: async (startLoc, destinationLoc) => {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${Strings.MAP_API_KEY}`);
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
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
