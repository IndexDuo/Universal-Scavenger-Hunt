import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useRef } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";

export default function App() {
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState("back"); // Default camera type is set to "back"
    const [permission, requestPermission] = useCameraPermissions(); // Handle camera permissions
    const [photoUri, setPhotoUri] = useState(null); // Store the captured photo URI
    const [isCameraReady, setIsCameraReady] = useState(false); // Track if the camera is ready

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Loading permissions...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    // Function to toggle between front and back camera
    function toggleCameraType() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    // Capture a photo and store its URI
    async function takePhoto() {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setPhotoUri(photo.uri); // Store the captured photo URI
                console.log("Captured Photo URI:", photo.uri);
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
                facing={facing}
                ref={cameraRef}
                onCameraReady={() => setIsCameraReady(true)} // Mark the camera as ready
            >
                {/* Control Buttons Inside the Camera View */}
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
