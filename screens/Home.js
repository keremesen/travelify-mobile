import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import * as Location from "expo-location";

import { getPlacesData } from "../api";
import SearchBar from "../components/SearchBar/SearchBar";
import Map from "../components/Map/Map";
import List from "../components/List/List";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

export default function Home() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);

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

  if (!location) {
    return null;
  }

  const handleRegionChangeComplete = async (region) => {
    setLocation(region);
    getPlacesData(region).then((data) => {
      setPlaces(data);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <View style={{ flex: 1, marginTop: 50 }}>
            <Text>Yükleniyor</Text>
          </View>
        </>
      ) : (
        <ScrollView style={{width:"100%", height:"100%"}} >
          <Map
            places={places}
            handleRegionChangeComplete={handleRegionChangeComplete}
            location={location}
          />
          <SearchBar onPlaceSelected={onPlaceSelected} />
          <List places={places} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
