import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const ResponsiveWrapper = ({ children }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        // Function to update the state based on screen size
        const handleResize = () => {
            const { width } = Dimensions.get("window");
            setIsLargeScreen(width > 768); // Set true if the width is greater than 768px
        };

        handleResize(); // Initial check on component mount
        Dimensions.addEventListener("change", handleResize); // Listen for screen dimension changes

        // Clean up event listener on unmount
        return () => {
            Dimensions.removeEventListener("change", handleResize);
        };
    }, []);

    // Show a message if the screen width is too large (desktop view)
    if (isLargeScreen) {
        return (
            <View style={styles.overlayContainer}>
                <Text style={styles.title}>Recommended for Mobile View</Text>
                <Text style={styles.description}>
                    It looks like you’re opening this app on a large screen. For
                    the best experience, we recommend using this app on a mobile
                    device or resizing your browser window.
                </Text>
                <Text style={styles.instruction}>
                    If you are using a desktop, you can open the developer tools
                    (right-click and select "Inspect") and switch to a mobile
                    view to simulate a mobile experience.
                </Text>
            </View>
        );
    }

    // If not a large screen, render the children (actual app content)
    return children;
};

// Styles for the overlay screen
const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        textAlign: "center",
        maxWidth: "80%",
    },
    instruction: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        maxWidth: "80%",
    },
});

export default ResponsiveWrapper;
