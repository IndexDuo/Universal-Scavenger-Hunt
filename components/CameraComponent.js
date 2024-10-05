// components/CameraComponent.js
import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera"; // Ensure Camera is correctly imported

function CameraComponent({ onPhotoTaken }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [cameraType, setCameraType] = useState(
        Camera.Constants ? Camera.Constants.Type.back : null
    ); // Handle undefined type

    useEffect(() => {
        (async () => {
            // Correct permissions request function
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    console.log("Camera Component: ", Camera);
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={
                    Camera?.Constants?.Type?.back || Camera.Constants.Type.back
                }
                // Use cameraType state
                ref={(ref) => setCameraRef(ref)}
            >
                <View style={styles.buttonContainer}>
                    <Button
                        title="Take Photo"
                        onPress={async () => {
                            if (cameraRef) {
                                const photo =
                                    await cameraRef.takePictureAsync();
                                onPhotoTaken(photo.uri); // Pass the photo URI to the parent component
                            }
                        }}
                    />
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
    },
});

export default CameraComponent;
