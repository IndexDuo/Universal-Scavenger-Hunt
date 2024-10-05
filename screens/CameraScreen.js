import React, { useState, useRef } from "react";
import {
    View,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";

function CameraScreen() {
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [showPreview, setShowPreview] = useState(false); // Toggle between preview and camera
    const navigation = useNavigation();
    const route = useRoute();
    const { huntTitle } = route.params || {}; // Receive hunt title for identification

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

    function toggleCameraType() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    async function takePhoto() {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setPhotoUri(photo.uri);
                setShowPreview(true); // Show the preview once the photo is taken
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    }

    function retakePhoto() {
        setPhotoUri(null);
        setShowPreview(false); // Return to camera view
    }

    function savePhoto() {
        navigation.navigate("HuntInfoScreen", { photoUri, huntTitle });
    }

    return (
        <View style={styles.container}>
            {!showPreview ? (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={cameraRef}
                    onCameraReady={() => setIsCameraReady(true)}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={toggleCameraType}
                        >
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePhoto}
                        >
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            ) : (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewText}>Preview</Text>
                    <Image
                        source={{ uri: photoUri }}
                        style={styles.previewImage}
                    />
                    <View style={styles.previewButtonContainer}>
                        <Button title="Take Again" onPress={retakePhoto} />
                        <Button title="Save Photo" onPress={savePhoto} />
                    </View>
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
        aspectRatio: 3 / 4,
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    previewText: {
        color: "white",
        fontSize: 24,
        marginBottom: 20,
    },
    previewImage: {
        width: 300,
        height: 400,
        borderRadius: 10,
    },
    previewButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginTop: 20,
    },
});

export default CameraScreen;
