import axios from "axios";


export const getPlacesData = async (location) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
      {
        params: {
            bl_latitude: location.latitude - 0.01,
            tr_latitude: location.latitude + 0.01,
            bl_longitude: location.longitude - 0.01,
            tr_longitude: location.longitude + 0.01,
        },
        headers: {
          "X-RapidAPI-Key": "15b844157fmsh076e1c8f19ecb82p1d2275jsn9b5566db6004" ,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
console.log(data)
    return data;
  } catch (error) {
    console.log("sa")
    console.log(error);
  }
};
