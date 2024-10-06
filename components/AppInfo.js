import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";

const AppInfoScreen = () => {
    const [appInfo, setAppInfo] = useState({});
    const [deviceInfo, setDeviceInfo] = useState({});

    useEffect(() => {
        // Get app-specific information
        setAppInfo({
            appName: Constants.manifest.name,
            appVersion: Constants.manifest.version,
            buildNumber: Constants.manifest.ios?.buildNumber,
            installationId: Constants.installationId,
        });

        // Get device-specific information
        setDeviceInfo({
            deviceName: Device.deviceName,
            modelName: Device.modelName,
            osName: Device.osName,
            osVersion: Device.osVersion,
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>App & Device Information</Text>
            <Text style={styles.infoText}>App Name: {appInfo.appName}</Text>
            <Text style={styles.infoText}>
                App Version: {appInfo.appVersion}
            </Text>
            <Text style={styles.infoText}>
                Build Number: {appInfo.buildNumber}
            </Text>
            <Text style={styles.infoText}>
                Installation ID: {appInfo.installationId}
            </Text>

            <Text style={styles.infoText}>
                Device Name: {deviceInfo.deviceName}
            </Text>
            <Text style={styles.infoText}>
                Model Name: {deviceInfo.modelName}
            </Text>
            <Text style={styles.infoText}>OS: {deviceInfo.osName}</Text>
            <Text style={styles.infoText}>
                OS Version: {deviceInfo.osVersion}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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

export default AppInfoScreen;
