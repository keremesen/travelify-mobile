import { Button, Image, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import PlaceDetails from "./PlaceDetails";

const List = ({ type, setType, rating, setRating }) => {
  return (
    <View className="flex m-4 ">
      <Text className="text-base m-2">Restaurants, Hotels & Attractions around you</Text>
      <View className="flex  flex-row   ">
        <Picker
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          style={{ width: "50%" }}
        >
          <Picker.Item label="Restaurants" value="restaurants" />
          <Picker.Item label="Hotels" value="hotels" />
          <Picker.Item label="Attractions" value="attractions" />
        </Picker>
        <Picker
          selectedValue={rating}
          onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
          style={{ width: "50%" }}
        >
          <Picker.Item label="All" value={0} />
          <Picker.Item label="Above 3.0" value={3} />
          <Picker.Item label="Above 4.0" value={4} />
          <Picker.Item label="Above 4.5" value={4.5} />
        </Picker>
      </View>

      <PlaceDetails />
    </View>
  );
};

export default List;
