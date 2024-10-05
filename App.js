import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import ResponsiveWrapper from "./components/ResponsiveWrapper";

// Define a custom theme for React Native Paper
const CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#0368D9", // Universal Blue
        accent: "#ed1c24", // Universal Red
        background: "#EAEAEA", // Light grey background
        surface: "#ffffff", // White surface for cards and list items
        text: "#222222",
        placeholder: "#888888",
    },
    roundness: 8, // Apply rounded corners for a modern look
    fonts: {
        regular: { fontFamily: "Avenir Next", fontWeight: "400" },
        medium: { fontFamily: "Avenir Next", fontWeight: "500" },
        light: { fontFamily: "Avenir Next", fontWeight: "300" },
        thin: { fontFamily: "Avenir Next", fontWeight: "100" },
    },
};

function App() {
    return (
        <PaperProvider theme={CustomTheme}>
            <ResponsiveWrapper>
                <BottomTabNavigator />
            </ResponsiveWrapper>
        </PaperProvider>
    );
}

export default App;