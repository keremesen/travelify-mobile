import { Button, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { usePlaces, usePlacesDispatch } from "../context/PlacesContext";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const Favorites = () => {
  const places = usePlaces();
  const dispatch = usePlacesDispatch();

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Tebrikler",
      text2: "Başarıyla favorilerden sildiniz.👋",
      position:"bottom",
    });
  };


  return (
    <ScrollView className="bg-gray-100 h-screen m-4">
      {places.map((place) => (
        <View
          key={place.id}
          className="my-2 bg-white p-3 rounded-lg space-y-2"
          style={{ elevation: 4 }}
        >
          <Image
            className="h-32"
            source={{ uri: place.image }}
            resizeMode="cover"
          />
          <Text className="text-2xl">{place.name} </Text>
          <View className="flex flex-row items-center">
            <Ionicons name="location" size={24} color="gray" />
            <Text className="text-gray-400  w-4/6 ">{place.address}</Text>
          </View>
          <Pressable
            onPress={() => {
              showToast();
              dispatch({
                type: "deleted",
                id: place.id,
              });
            }}
            className="bg-red-400 items-center justify-center p-2 rounded-lg w-auto ml-auto "
          >
            <Text className="text-white font-semibold" >Favorilerden Sil</Text>
          </Pressable>
          
        </View>
      ))}
    </ScrollView>
  );
};

export default Favorites;
