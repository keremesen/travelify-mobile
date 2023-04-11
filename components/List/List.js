import { Button, Image, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const List = ({ places }) => {
  return (
    <View style={{ width: "100%" }}>
      <ScrollView style={{ maxHeight: 300, width: "86%" }}>
        {places?.map((place, index) => (
          <View key={index} style={styles.card}>
            <Image
              style={{ height: 150 }}
              source={{
                uri: place.photo
                  ? place.photo.images.large.url
                  : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
              }}
              resizeMode="cover"
            />
            <Text>{place.name}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={24} color="gold" />

                <Text>{place.rating} </Text>
              </View>
              <Text>
                {place.num_reviews} review{place.num_reviews > 1 && "s"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Price</Text>
              <Text>{place.price_level}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Ranking</Text>
              <Text>{place.ranking}</Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {place?.cuisine?.map(({ name }) => (
                  <View key={name} style={styles.chip}>
                    <Text> {name} </Text>
                  </View>
                ))}
              </View>
            </View>
            {place.address && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Ionicons name="location" size={24} color="gray" />
                <Text>{place.address}</Text>
              </View>
            )}
            {place.phone && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Ionicons name="phone-portrait" size={24} color="gray" />
                <Text>{place.phone}</Text>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity style={{marginRight:12}} onPress={() => Linking.openURL(place.web_url)}>
                <Text>Trip Advisor</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
                <Text>Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  card: {
    display: "flex",
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    marginVertical: 12,
    padding: 12,
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  chip: {
    backgroundColor: "#E0E0E0",
    display: "flex",
    width: "auto",
    marginVertical: 6,
    padding: 6,
    borderRadius: 12,
    marginRight: 12,
  },
});
