import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text } from "react-native-paper"; // Ensure these are correctly imported
import AsyncStorage from "@react-native-async-storage/async-storage";
import huntsData from "../data/huntsData.json"; // Ensure the path is correct

function ListScreen({ navigation }) {
    const [hunts, setHunts] = useState([]);
    const [completedHunts, setCompletedHunts] = useState({});

    useEffect(() => {
        // Load hunts from JSON file
        setHunts(huntsData);

        // Load completed status from AsyncStorage
        async function loadCompletedHunts() {
            try {
                const storedStatus =
                    await AsyncStorage.getItem("completedHunts");
                if (storedStatus) {
                    setCompletedHunts(JSON.parse(storedStatus));
                }
            } catch (e) {
                console.error("Failed to load completed hunts", e);
            }
        }
        loadCompletedHunts();
    }, []);

    // Toggle completed status for a hunt
    const toggleCompleted = async (huntId) => {
        const newStatus = {
            ...completedHunts,
            [huntId]: !completedHunts[huntId],
        };
        setCompletedHunts(newStatus);
        await AsyncStorage.setItem("completedHunts", JSON.stringify(newStatus));
    };

    // Render each hunt item using React Native Paper's Card component
    function renderItem({ item }) {
        return (
            <Card
                style={[
                    styles.huntItem,
                    completedHunts[item.id] && styles.huntItemCompleted,
                ]}
                onPress={() =>
                    navigation.navigate("HuntInfoScreen", {
                        huntTitle: item.title,
                        huntDescription: item.description,
                        geolocation: item.geolocation,
                        hintPhotoUri: item.hintPhotoUri,
                        completed: completedHunts[item.id] || false,
                        id: item.id, // Pass the ID to track completion status
                    })
                }
            >
                <Card.Content>
                    <Text variant="medium" style={styles.huntTitle}>
                        {item.title}
                        {completedHunts[item.id] && " ✅"}{" "}
                        {/* Show checkmark if completed */}
                    </Text>
                    <Text variant="medium" style={styles.huntDescription}>
                        {item.description}
                    </Text>
                </Card.Content>
            </Card>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={hunts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAEA", // Light grey background for the screen
    },
    huntItem: {
        marginVertical: 8,
        backgroundColor: "#ffffff", // White card background
        borderRadius: 8,
        elevation: 4, // Paper's shadow style for better card effect
    },
    huntItemCompleted: {
        backgroundColor: "#d4edda", // Light green background for completed items
    },
    huntTitle: {
        fontFamily: "Avenir Next", // Font family for titles
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 30,
        letterSpacing: -0.022,
        color: "#0368D9", // Universal Blue for title text
    },
    huntDescription: {
        fontFamily: "Avenir Next", // Font family for descriptions
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        letterSpacing: -0.022,
        color: "#666666", // Grey color for descriptions
    },
});

export default ListScreen;
