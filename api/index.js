import axios from "axios";
import {REACT_APP_RAPIDAPI_TRAVEL_API_KEY} from "@env"

export const getPlacesData = async (location, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
            bl_latitude: location.latitude - 0.01,
            tr_latitude: location.latitude + 0.01,
            bl_longitude: location.longitude - 0.01,
            tr_longitude: location.longitude + 0.01,
            limit:18,
        },
        headers: {
          "X-RapidAPI-Key": REACT_APP_RAPIDAPI_TRAVEL_API_KEY ,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};
