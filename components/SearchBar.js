import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { REACT_APP_GOOGLE_MAP_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchBar = ({ onPlaceSelected }) => {
  return (
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
  );
};

export default SearchBar;

const styles = StyleSheet.create({
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
