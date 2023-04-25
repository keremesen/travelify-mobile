import { Button, Text, View, Image } from "react-native";
import React from "react";
import { usePlaces, usePlacesDispatch } from "../context/PlacesContext";
import { ScrollView } from "react-native-gesture-handler";

const Favorites = () => {
  const places = usePlaces();
  const dispatch = usePlacesDispatch();

  return (
    <ScrollView className="bg-gray-200 h-screen" >
      {places.map((place) => (
        <View key={place.id} className="my-2 bg-white p-2 rounded-lg">
          <Image className="h-32" source={{uri:place.image}} resizeMode="cover" />
          <Text className="text-2xl">{place.name} </Text>
          <Text className="text-gray-400" >{place.address} </Text>
          <Button
            onPress={() => {
              dispatch({
                type: "deleted",
                id: place.id,
              });
            }}
            title="X"
            color="red"
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Favorites;
