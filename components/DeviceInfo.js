import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Device from "expo-device";

const DeviceInfoScreen = () => {
    const [deviceInfo, setDeviceInfo] = useState({});

    useEffect(() => {
        const getDeviceDetails = () => {
            setDeviceInfo({
                brand: Device.brand,
                manufacturer: Device.manufacturer,
                modelName: Device.modelName,
                deviceName: Device.deviceName,
                osName: Device.osName,
                osVersion: Device.osVersion,
                uniqueId: Device.osBuildId || Device.modelId, // Unique ID alternative
            });
        };
        getDeviceDetails();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Device Information</Text>
            <Text style={styles.infoText}>Brand: {deviceInfo.brand}</Text>
            <Text style={styles.infoText}>
                Manufacturer: {deviceInfo.manufacturer}
            </Text>
            <Text style={styles.infoText}>Model: {deviceInfo.modelName}</Text>
            <Text style={styles.infoText}>
                Device Name: {deviceInfo.deviceName}
            </Text>
            <Text style={styles.infoText}>OS: {deviceInfo.osName}</Text>
            <Text style={styles.infoText}>
                OS Version: {deviceInfo.osVersion}
            </Text>
            <Text style={styles.infoText}>
                Unique ID: {deviceInfo.uniqueId}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default DeviceInfoScreen;
