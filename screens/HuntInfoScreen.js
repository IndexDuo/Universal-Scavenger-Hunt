import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import huntsData from "../data/huntsData.json";

function HuntInfoScreen({ route, navigation }) {
  const { huntId, photoUri: newPhotoUri } = route.params || {};
  const [photoUri, setPhotoUri] = useState(null);
  const [hunt, setHunt] = useState(null);

  useEffect(() => {
    const selectedHunt = huntsData.find((hunt) => hunt.id === huntId);
    setHunt(selectedHunt);
  }, [huntId]);

  useEffect(() => {
    async function loadPhoto() {
      const storedPhotoUri = await AsyncStorage.getItem(`${hunt?.title}-photo`);
      if (storedPhotoUri) {
        setPhotoUri(storedPhotoUri);
      }
    }
    if (hunt) {
      loadPhoto();
    }
  }, [hunt]);

  useEffect(() => {
    if (newPhotoUri) {
      setPhotoUri(newPhotoUri);
      savePhoto(newPhotoUri);
    }
  }, [newPhotoUri]);

  async function savePhoto(uri) {
    await AsyncStorage.setItem(`${hunt?.title}-photo`, uri);
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#0368D9" />
        </TouchableOpacity>
      </View>

      {/* Photo Display */}
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photo} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No photo taken yet</Text>
        </View>
      )}

      {/* Hunt Title and Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{hunt?.title}</Text>
        <Text style={styles.description}>{hunt?.description}</Text>
      </View>

      {/* Floating Action Button (FAB) for taking a new photo */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("CameraScreen", { huntTitle: hunt?.title })
        }
      >
        <Ionicons name="camera" size={30} color="white" />
        <Text style={styles.fabText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  photo: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholder: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#888888",
    fontSize: 16,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666666",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0368D9",
    borderRadius: 50,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  fabText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default HuntInfoScreen;
