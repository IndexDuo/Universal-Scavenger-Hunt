import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

// Get the screen dimensions
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function HuntInfoScreen({ route, navigation }) {
  const { huntTitle, photoUri: newPhotoUri } = route.params || {};
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      const storedPhotoUri = await AsyncStorage.getItem(`${huntTitle}-photo`);
      if (storedPhotoUri) {
        setPhotoUri(storedPhotoUri);
      }
    }
    loadPhoto();
  }, []);

  useEffect(() => {
    if (newPhotoUri) {
      setPhotoUri(newPhotoUri);
      savePhoto(newPhotoUri);
    }
  }, [newPhotoUri]);

  // Save photo to AsyncStorage
  async function savePhoto(uri) {
    await AsyncStorage.setItem(`${huntTitle}-photo`, uri);
  }

  // Function to delete the photo
  async function deletePhoto() {
    await AsyncStorage.removeItem(`${huntTitle}-photo`); // Remove from AsyncStorage
    setPhotoUri(null); // Remove from state
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
        <Text style={styles.title}>{huntTitle}</Text>
        <Text style={styles.description}>
          Take a photo to complete this scavenger hunt and save your memory!
        </Text>
      </View>

      {/* Floating Action Button (FAB) for taking a new photo */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("CameraScreen", { huntTitle })}>
        <Ionicons name="camera" size={30} color="white" />
        <Text style={styles.fabText}>Take Photo</Text>
      </TouchableOpacity>

      {/* Delete Photo Button (visible only if a photo exists) */}
      {photoUri && (
        <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
          <Ionicons name="trash" size={24} color="white" />
          <Text style={styles.deleteButtonText}>Delete Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  customHeader: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  photo: {
    width: screenWidth,
    height: screenHeight * 0.4, // 40% of the screen height
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
  },
  placeholder: {
    width: screenWidth,
    height: screenHeight * 0.4,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    color: "#888",
  },
  textContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    color: "#666",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    left: screenWidth / 2 - 75,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0368D9",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    position: "absolute",
    bottom: 100, // Position above the "Take Photo" button
    left: screenWidth / 2 - 90, // Center the button
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4d4d", // Red color for delete button
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default HuntInfoScreen;
