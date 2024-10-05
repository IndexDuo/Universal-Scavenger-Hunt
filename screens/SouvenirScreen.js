import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function SouvenirScreen() {
    const [souvenirs, setSouvenirs] = useState([]);

    const fetchSouvenirs = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const souvenirKeys = keys.filter(key => key.endsWith('-photo'));
            const souvenirData = await Promise.all(
                souvenirKeys.map(async key => {
                    const uri = await AsyncStorage.getItem(key);
                    const title = key.replace('-photo', '');
                    return { title, uri };
                })
            );
            setSouvenirs(souvenirData.reverse()); // Most recent first
        } catch (error) {
            console.error("Error fetching souvenirs:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSouvenirs();
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Your Souvenirs</Text>
            {souvenirs.length > 0 ? (
                souvenirs.map((souvenir, index) => (
                    <View key={index} style={styles.souvenirContainer}>
                        <Text style={styles.souvenirTitle}>{souvenir.title}</Text>
                        <Image source={{ uri: souvenir.uri }} style={styles.souvenirImage} />
                    </View>
                ))
            ) : (
                <Text style={styles.noSouvenirsText}>No souvenirs collected yet.</Text>
            )}
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
    souvenirContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    souvenirTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    souvenirImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    noSouvenirsText: {
        fontSize: 16,
        color: "#666",
    },
});

export default SouvenirScreen;