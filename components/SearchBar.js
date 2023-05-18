import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { REACT_APP_GOOGLE_MAP_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const SearchBar = ({ onPlaceSelected, type, setType, rating, setRating }) => {
  const categories = [
    {
      name: "Restaurants",
      icon: <Ionicons name="restaurant-outline" size={18} color="black" />,
      handleType: "restaurants",
    },
    {
      name: "Hotels",
      icon: <FontAwesome name="hotel" size={18} color="black" />,
      handleType: "hotels",
    },
    {
      name: "Attractions",
      icon: <MaterialIcons name="attractions" size={18} color="black" />,
      handleType: "attractions",
    },
    {
      name: "All",
      value: "0",
      icon: <Ionicons name="star" size={24} color="gold" />,
    },
    {
      name: "3.0",
      value: "3.0",
      icon: <Ionicons name="star" size={24} color="gold" />,
    },
    {
      name: "4.0",
      value: "4.0",
      icon: <Ionicons name="star" size={24} color="gold" />,
    },
    {
      name: "4.5",
      value: "4.5",
      icon: <Ionicons name="star" size={24} color="gold" />,
    },
  ];
  return (
    <View style={styles.container}>
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
          textInput: styles.autocompleteTextInput,
        }}
      />
      <FlatList
        className=" mt-2"
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-full px-6 space-x-2 py-2 mx-2 items-center justify-center flex flex-row "
            onPress={() =>
              item.value ? setRating(item.value) : setType(item.handleType)
            }
          style={{ backgroundColor: type===item.handleType? "#cbd5e1" : "white" && rating===item.value? "#cbd5e1" : "white" }}
          >
            {item.icon}
            <Text>{item.name} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  autocompleteTextInput: {
    backgroundColor: "#FFF",
    fontSize: 16,
  },
});
