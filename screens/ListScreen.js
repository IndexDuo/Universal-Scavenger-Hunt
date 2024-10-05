import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import huntsData from "../data/huntsData.json";

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

    // Render each hunt item
    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={[
                    styles.huntItem,
                    completedHunts[item.id] && styles.huntItemCompleted,
                ]}
                onPress={() =>
                    navigation.navigate("HuntInfoScreen", {
                        huntTitle: item.title,
                    })
                }
            >
                <Text style={styles.huntTitle}>
                    {item.title}
                    {completedHunts[item.id] && " ✅"}{" "}
                    {/* Show checkmark if completed */}
                </Text>
                <Text style={styles.huntDescription}>{item.description}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Scavenger Hunts</Text> */}
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
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    huntItem: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    huntItemCompleted: {
        backgroundColor: "#d4edda", // Light green background for completed items
    },
    huntTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    huntDescription: {
        fontSize: 14,
        color: "#666",
    },
});

export default ListScreen;