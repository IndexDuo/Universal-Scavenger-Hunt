import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import HUNT_DATA from "../components/HuntList";

function HuntInfoScreen({ route, navigation }) {
    const { huntTitle, photoUri: newPhotoUri } = route.params || {};
    const [photoUri, setPhotoUri] = useState(null);

    // Load photo from AsyncStorage when the component mounts or new photo is taken
    useEffect(() => {
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

    // Update photoUri if a new photo is taken
    useEffect(() => {
        if (newPhotoUri) {
            setPhotoUri(newPhotoUri);
            savePhoto(newPhotoUri); // Save the new photo to AsyncStorage
        }
    }, [newPhotoUri]);

    async function savePhoto(uri) {
        await AsyncStorage.setItem(`${huntTitle}-photo`, uri);
    }

    return (
        <View style={styles.container}>
            {/* Display the saved photo or a placeholder box */}
            {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>
                        No photo taken yet
                    </Text>
                </View>
            )}

            {/* Hunt title and description */}
            <Text style={styles.title}>{huntTitle}</Text>
            <Text style={styles.description}>
                {HUNT_DATA.find((hunt) => hunt.title === huntTitle).description}
            </Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
        color: "#666",
    },
    photo: {
        width: 350,
        height: 350,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    placeholder: {
        width: 350,
        height: 350,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#e0e0e0", // Grey background color for the placeholder
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 18,
        color: "#888",
    },
    fab: {
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6200ea",
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
});

export default HuntInfoScreen;
