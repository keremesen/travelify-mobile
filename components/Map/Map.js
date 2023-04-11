import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";

const Map = ({ location, handleRegionChangeComplete, places }) => {
  return (
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
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height-100,
  },
});
