import {
  Button,
  Image,
  Linking,
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT + 50;
const PlaceDetails = ({ places }) => {
  const [index, setIndex] = useState(0);
  const animation = new Animated.Value(0);
  return (
    <Animated.ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: animation,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      style={styles.scrollView}
      contentContainerStyle={styles.endPadding}
    >
      {places?.map((place, index) => (
        <ScrollView
          key={index}
          className=" h-56 w-64   bg-white   rounded-md overflow-hidden mx-2"
        >
          <Image
            className="h-32"
            source={{
              uri: place.photo
                ? place.photo.images.large.url
                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
            }}
            resizeMode="cover"
          />
          <View className="p-2 space-y-1">
            <Text className="text-lg font-medium">{place.name}</Text>
            <View className="flex flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Ionicons name="star" size={24} color="gold" />

                <Text className="ml-2 font-medium">{place.rating} </Text>
              </View>
              <Text className="text-gray-700">
                {place.num_reviews} review{place.num_reviews > 1 && "s"}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-700">Price</Text>
              <Text className="text-gray-700">{place.price_level}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-700">Ranking</Text>
              <Text className="text-gray-700">{place.ranking}</Text>
            </View>
            <View className="flex flex-row justify-start">
              <View className="flex-row flex-wrap">
                {place?.cuisine?.map(({ name }) => (
                  <View
                    key={name}
                    className="bg-gray-200 w-auto p-1.5 my-1.5 rounded-full mr-3 flex"
                  >
                    <Text> {name} </Text>
                  </View>
                ))}
              </View>
            </View>
            {place.address && (
              <View className="flex flex-row justify-between items-center">
                <Ionicons name="location" size={24} color="gray" />
                <Text numberOfLines={1} className="text-gray-400  w-4/6 ">
                  {place.address}
                </Text>
              </View>
            )}
            {place.phone && (
              <View className="flex flex-row justify-between items-center">
                <Ionicons name="phone-portrait" size={24} color="gray" />
                <Text className="text-gray-400">{place.phone}</Text>
              </View>
            )}
            <View className="flex flex-row ">
              <TouchableOpacity
                className="mr-4"
                onPress={() => Linking.openURL(place.web_url)}
              >
                <Text className="text-blue-500 font-semibold ">
                  Trip Advisor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
                <Text className="text-blue-500 font-semibold ">Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

export default PlaceDetails;
