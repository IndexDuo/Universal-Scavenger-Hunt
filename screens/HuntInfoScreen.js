// screens/HuntInfoScreen.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraComponent from "../components/CameraComponent";

function HuntInfoScreen({ route, navigation }) {
    const { huntTitle } = route.params;
    const [showCamera, setShowCamera] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);

    // Load photo from AsyncStorage
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

    // Handle photo saving
    async function handlePhotoTaken(uri) {
        setPhotoUri(uri);
        setShowCamera(false);

        // Save photo URI to AsyncStorage
        await AsyncStorage.setItem(`${huntTitle}-photo`, uri);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{huntTitle}</Text>
            <Text style={styles.description}>
                Take a photo to complete this scavenger hunt and save your
                memory!
            </Text>

            {/* Display the camera component or the saved photo */}
            {showCamera ? (
                <CameraComponent onPhotoTaken={handlePhotoTaken} />
            ) : (
                <View>
                    {photoUri ? (
                        <Image
                            source={{ uri: photoUri }}
                            style={styles.photo}
                        />
                    ) : (
                        <Text>No photo taken yet.</Text>
                    )}

                    {/* Show buttons for taking or retaking a photo */}
                    <Button
                        title="Take Photo"
                        onPress={() => setShowCamera(true)}
                    />
                </View>
            )}

            <Button title="Back to List" onPress={() => navigation.goBack()} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    photo: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
});

export default HuntInfoScreen;
