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
import * as Device from "expo-device"; // Import expo-device to get device information
import axios from "axios"; // Use axios for HTTP requests

// Get the screen dimensions
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function HuntInfoScreen({ route, navigation }) {
    const { huntTitle, photoUri: newPhotoUri } = route.params || {};
    const [photoUri, setPhotoUri] = useState(null);
    const [deviceId, setDeviceId] = useState(""); // State to store the unique device ID

    useEffect(() => {
        // Get the unique device ID when the component mounts
        const uniqueId =
            Device.osBuildId || Device.modelId || "unknown-device-id";
        setDeviceId(uniqueId); // Set the device ID in state

        // Load photo from AsyncStorage
        async function loadPhoto() {
            const storedPhotoUri = await AsyncStorage.getItem(
                `${huntTitle}-photo`
            );
            if (storedPhotoUri) {
                setPhotoUri(storedPhotoUri);
            }
        }
        loadPhoto();
    }, []);
    // console.log("Device ID:", deviceId);

    useEffect(() => {
        if (newPhotoUri) {
            setPhotoUri(newPhotoUri);
            savePhoto(newPhotoUri);
            savePhotoToBackend(newPhotoUri); // Save the new photo to the backend
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

    // Save the photo data to MongoDB with the device ID
    async function savePhotoToBackend(uri) {
        try {
            const response = await axios.post(
                "http://<your-server-ip-address>:5000/photos/add",
                {
                    userId: deviceId, // Include the device ID
                    huntTitle: huntTitle,
                    description: "Scavenger Hunt Photo",
                    photoUri: uri,
                    dateTaken: new Date(),
                }
            );
            console.log("Photo saved to backend:", response.data);
        } catch (error) {
            console.error("Error saving photo to backend:", error);
        }
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
                    <Text style={styles.placeholderText}>
                        No photo taken yet
                    </Text>
                </View>
            )}

            {/* Hunt Title and Description */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{huntTitle}</Text>
                <Text style={styles.description}>
                    Take a photo to complete this scavenger hunt and save your
                    memory!
                </Text>
            </View>

            {/* Floating Action Button (FAB) for taking a new photo */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() =>
                    navigation.navigate("CameraScreen", { huntTitle })
                }
            >
                <Ionicons name="camera" size={30} color="white" />
                <Text style={styles.fabText}>Take Photo</Text>
            </TouchableOpacity>

            {/* Delete Photo Button (visible only if a photo exists) */}
            {photoUri && (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deletePhoto}
                >
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
        bottom: 100,
        left: screenWidth / 2 - 90,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff4d4d",
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
