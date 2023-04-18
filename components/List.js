import { Button, Image, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import PlaceDetails from "./PlaceDetails";

const List = ({ type, setType, rating, setRating }) => {
  return (
    <View className="flex   w-48 ml-2 ">
      <Picker
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
      >
        <Picker.Item label="Restaurants" value="restaurants" />
        <Picker.Item label="Hotels" value="hotels" />
        <Picker.Item label="Attractions" value="attractions" />
      </Picker>
      <Picker
        selectedValue={rating}
        onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
      >
        <Picker.Item label="All" value={0} />
        <Picker.Item label="Above 3.0" value={3} />
        <Picker.Item label="Above 4.0" value={4} />
        <Picker.Item label="Above 4.5" value={4.5} />
      </Picker>
      <PlaceDetails />
    </View>
  );
};

export default List;
