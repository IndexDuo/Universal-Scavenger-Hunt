import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button, Share } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

function SouvenirScreen() {
    const [souvenirs, setSouvenirs] = useState([]);

    const fetchSouvenirs = async () => {
        try {
            const response = await fetch('http://localhost:3000/souvenirs');
            const data = await response.json();
            setSouvenirs(data.reverse()); // Most recent first
        } catch (error) {
            console.error("Error fetching souvenirs:", error);
        }
    };

    const shareCollection = async () => {
        try {
            const ids = souvenirs.map(souvenir => souvenir.id);
            const response = await fetch('http://localhost:3000/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids }),
            });
            const data = await response.json();
            await Share.share({
                message: `Check out my souvenir collection!\n${data.collectionUrl}`,
            });
        } catch (error) {
            console.error("Error sharing souvenir collection:", error);
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
                <>
                    {souvenirs.map((souvenir, index) => (
                        <View key={index} style={styles.souvenirContainer}>
                            <Text style={styles.souvenirTitle}>{souvenir.title}</Text>
                            <Image source={{ uri: souvenir.uri }} style={styles.souvenirImage} />
                        </View>
                    ))}
                    <Button
                        title="Share Collection"
                        onPress={shareCollection}
                    />
                </>
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