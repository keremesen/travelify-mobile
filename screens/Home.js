import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { REACT_APP_GOOGLE_MAP_API_KEY } from "@env";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

export default function Home() {
  const [location, setLocation] = useState(null);
  const [loading, setloading] = useState(false);
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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      setloading(true);
    })();
  }, []);

  if (!location) {
    return null;
  }

  const handleRegionChangeComplete = (region) => {
    setLocation(region);
    console.log(region)
  };

  return (
    <View style={styles.container}>
      {loading ? (
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
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Text>Yükleniyor</Text>
          </View>
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
