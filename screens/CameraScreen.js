import React, { useState, useRef } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

function CameraScreen() {
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
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
                setShowPreview(true);
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    }

    function retakePhoto() {
        setPhotoUri(null);
        setShowPreview(false);
    }

    function savePhoto() {
        navigation.navigate("HuntInfoScreen", { photoUri, huntTitle });
    }

    return (
        <View style={styles.container}>
            {/* Custom Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#0368D9" />
            </TouchableOpacity>

            {!showPreview ? (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={cameraRef}
                    onCameraReady={() => setIsCameraReady(true)}
                >
                    {/* Camera Control Buttons */}
                    <View style={styles.controlContainer}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleCameraType}
                        >
                            <MaterialCommunityIcons
                                name="camera-flip"
                                size={40}
                                color="#ffffff"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shutterButton}
                            onPress={takePhoto}
                        >
                            <MaterialCommunityIcons
                                name="camera-iris"
                                size={70}
                                color="#ffffff"
                            />
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
                        <TouchableOpacity
                            style={[styles.actionButton, styles.retakeButton]}
                            onPress={retakePhoto}
                        >
                            <Text style={styles.buttonText}>Take Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.saveButton]}
                            onPress={savePhoto}
                        >
                            <Text style={styles.buttonText}>Save Photo</Text>
                        </TouchableOpacity>
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
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    controlContainer: {
        position: "absolute",
        bottom: 70,
        width: "45%",
        flexDirection: "row",
        justifyContent: "space-between", // Center the buttons evenly
        alignItems: "center",
        paddingHorizontal: 50, // Adjust the padding to position correctly
    },
    iconButton: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 30,
        padding: 10,
    },
    shutterButton: {
        width: 70,
        height: 70,
        borderRadius: 35, // Circular shape for the shutter button
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Slightly transparent background
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
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },
    retakeButton: {
        backgroundColor: "#ff4d4d",
    },
    saveButton: {
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CameraScreen;
