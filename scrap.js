import React, { useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function App() {
    const [cameraType, setCameraType] = useState(CameraType?.Back || "back");
    const [permission, requestPermission] = useCameraPermissions();
    const [ratio, setRatio] = useState('16:9');
    
    if (!permission) {
        return <View />; // Camera permissions are still loading
    }

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

    function toggleCameraType() {
        setCameraType((current) =>
            current === CameraType.Back ? CameraType.Front : CameraType.Back
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} type={cameraType}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});
