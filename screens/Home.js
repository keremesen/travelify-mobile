import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { REACT_APP_GOOGLE_MAP_API_KEY } from "@env";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { getPlacesData } from "../api";

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
          <View style={{ flex: 1 }}>
            <Text>Yükleniyor</Text>
          </View>
        </>
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: location.latitudeDelta,
              longitudeDelta: location.longitudeDelta,
            }}
            onRegionChangeComplete={handleRegionChangeComplete}
            provider="google"
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Callout>
                <Text>Buradasın</Text>
              </Callout>
            </Marker>
            {places?.map((place, index) => {
              const latitude = parseFloat(place.latitude);
              const longitude = parseFloat(place.longitude);

              if (isNaN(latitude) || isNaN(longitude)) {
                // Handle invalid coordinates
                return null;
              }

              return (
                <Marker key={index} coordinate={{ latitude, longitude }}>
                  <Callout>
                    <View>
                      <Text>
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={{
                            uri: place.photo
                              ? place.photo.images.large.url
                              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
                          }}
                          resizeMode="cover"
                        />
                      </Text>
                      <Text>{place.name}</Text>
                      <Text>{place.rating}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>

          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details) => {
              onPlaceSelected(details);
            }}
            query={{
              key: REACT_APP_GOOGLE_MAP_API_KEY,
              language: "en",
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.autocompleteTextInput,
            }}
          />
        </>
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
  },
  autocompleteTextInput: {
    backgroundColor: "#FFF",
    fontSize: 16,
  },
});
