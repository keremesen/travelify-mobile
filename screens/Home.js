import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import * as Location from "expo-location";

import { getPlacesData } from "../api";
import SearchBar from "../components/SearchBar.js";
import Map from "../components/Map.js";
import List from "../components/List.js";
import { ScrollView } from "react-native-gesture-handler";
import PlaceDetails from "../components/PlaceDetails";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

export default function Home() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  const onPlaceSelected = (details) => {
    setLocation({
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      latitudeDelta:
        details?.geometry.viewport.northeast.lat -
        details?.geometry.viewport.southwest.lat,
      longitudeDelta:
        details?.geometry.viewport.northeast.lat -
        details?.geometry.viewport.southwest.lat * ASPECT_RATIO,
    });
  };

  if (!location) {
    return null;
  }

  const handleRegionChangeComplete = async (region) => {
    setLocation(region);
    getPlacesData(region, type).then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      {isLoading ? (
        <>
          <View className="flex-1 items-center justify-center">
            <Text className="font-bold text-3xl" >Yükleniyor</Text>
          </View>
        </>
      ) : (
        <View className="flex-1">
          <Map
            places={filteredPlaces.length ? filteredPlaces : places}
            handleRegionChangeComplete={handleRegionChangeComplete}
            location={location}
          />
          <SearchBar onPlaceSelected={onPlaceSelected} />
          <ScrollView className="w-full">
            <List
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
            <PlaceDetails
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}
