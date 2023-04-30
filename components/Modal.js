import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePlacesDispatch } from "../context/PlacesContext";

const MyModal = ({ modalVisible, setModalVisible, place }) => {
  const dispatch = usePlacesDispatch();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-lg font-medium">{place?.name}</Text>
            <View className="flex flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Ionicons name="star" size={24} color="gold" />

                <Text className="ml-2 font-medium">{place?.rating} </Text>
              </View>
              <Text className="text-gray-700">
                {place?.num_reviews} review{place?.num_reviews > 1 && "s"}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-700">Price</Text>
              <Text className="text-gray-700">{place?.price_level}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-700">Ranking</Text>
              <Text className="text-gray-700">{place?.ranking}</Text>
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
            {place?.address && (
              <View className="flex flex-row justify-between">
                <Ionicons name="location" size={24} color="gray" />
                <Text className="text-gray-400  w-4/6 ">{place.address}</Text>
              </View>
            )}

            <Text style={styles.modalText}>{place?.name} </Text>
            <View className="flex-row space-x-4">
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  dispatch({
                    type: "added",
                    id: nextId++,
                    image: place?.photo.images.large.url
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
                    name: place?.name,
                    address: place?.address,
                  });
                }}
              >
                <Text style={styles.textStyle}>Favorilere Ekle</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
let nextId = 4;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MyModal;
