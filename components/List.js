import { Button, Image, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import PlaceDetails from "./PlaceDetails";

const List = ({type, setType}) => {



  return (
    <View className="flex   w-48 ml-2 "   >
      <Picker
      selectedValue={type}
      onValueChange={(itemValue, itemIndex) => setType(itemValue)}
      >
        <Picker.Item label="Restaurants" value="restaurants" />
        <Picker.Item label="Hotels" value="hotels" />
        <Picker.Item label="Attractions" value="attractions" />
      </Picker>
      <Picker>
        <Picker.Item label="Above 3.0" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <PlaceDetails />
    </View>
  );
};

export default List;
