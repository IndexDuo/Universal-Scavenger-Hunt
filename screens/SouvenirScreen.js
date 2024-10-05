// screens/SouvenirScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function SouvenirScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Souvenirs</Text>
            <Text style={styles.instructions}>
                View and manage photos of your completed hunts here.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    instructions: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default SouvenirScreen;
