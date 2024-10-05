// screens/LandingScreen.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function LandingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome to the Universal Scavenger Hunt!
            </Text>
            {/* <Image
                source={require("../assets/map.png")}
                style={styles.mapImage}
            /> */}
            <Text style={styles.instructions}>
                Explore the park, complete challenges, and create lasting
                memories!
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
    mapImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    instructions: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default LandingScreen;
