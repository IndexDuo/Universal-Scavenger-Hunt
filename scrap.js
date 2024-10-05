// App.js (or CameraComponent.js if you prefer)
import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function App() {
    const [cameraType, setCameraType] = useState("back"); // Use the new CameraType enum
    const [permission, requestPermission] = useCameraPermissions(); // Permissions hook for camera
    const [photoUri, setPhotoUri] = useState(null); // Store the URI of the captured photo
    const [isCameraReady, setIsCameraReady] = useState(false); // State to handle camera readiness

    // Check if permissions are still loading
    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Loading permissions...</Text>
            </View>
        );
    }

    // Check if permissions are granted
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    // Function to toggle between front and back camera
    function toggleCameraType() {
        setCameraType((current) =>
            current === CameraType.Back ? CameraType.Front : CameraType.Back
        );
    }

    // Function to capture the photo
    async function takePhoto() {
        if (isCameraReady) {
            try {
                // Capture a photo using the CameraView API (simulating capture)
                const photo = await CameraView.current.CameraPictureOptions();
                setPhotoUri(photo.uri);
                console.log("Photo URI:", photo.uri);
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* Camera View */}
            <CameraView
                style={styles.camera}
                type={cameraType}
                onCameraReady={() => setIsCameraReady(true)} // Mark the camera as ready
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.text}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>

            {/* Display the captured photo */}
            {photoUri && (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewText}>Captured Image:</Text>
                    <Image
                        source={{ uri: photoUri }}
                        style={styles.previewImage}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black",
    },
    camera: {
        flex: 1,
        aspectRatio: 3 / 4, // Adjust the aspect ratio to fit your screen
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    previewContainer: {
        position: "absolute",
        bottom: 100,
        left: 10,
        right: 10,
        alignItems: "center",
    },
    previewText: {
        color: "white",
        fontSize: 18,
        marginBottom: 10,
    },
    previewImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
});
