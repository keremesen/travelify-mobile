import { Button, Image, Linking, View, Text } from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const PlaceDetails = ({ places }) => {
  return (
    <ScrollView className="flex max-h-80 w-5/6 mx-auto">
      {places?.map((place, index) => (
        <View
          key={index}
          className="flex h-auto w-full bg-white justify-center my-3 p-3 rounded-md space-y-3"
          style={{ elevation: 4 }}
        >
          <Image
            className="h-60"
            source={{
              uri: place.photo
                ? place.photo.images.large.url
                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
            }}
            resizeMode="cover"
          />
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
              <Text className="text-gray-400  w-4/6 ">{place.address}</Text>
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
              <Text className="text-blue-500 font-semibold ">Trip Advisor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
              <Text className="text-blue-500 font-semibold ">Website</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PlaceDetails;
