import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Provider as PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StackNavigator from "./StackNavigator"; // Import the StackNavigator for List Screen
import SouvenirScreen from "../screens/SouvenirScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"; // Import helper function

// Create a custom theme for the bottom navigation and screens
const CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#0033a0", // Universal Studios Blue
        accent: "#ed1c24", // Universal Studios Red
        background: "#f2f2f2", // Light grey background
        card: "#ffffff", // White background for bottom tab
        text: "#222222", // Dark text color for better readability
    },
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const theme = useTheme();

    // Helper function to hide tab bar on certain screens
    function getTabBarVisibility(route) {
        const routeName =
            getFocusedRouteNameFromRoute(route) ?? "ScavengerHuntList";
        // If the current screen is CameraScreen, hide the tab bar
        if (routeName === "CameraScreen") {
            return { display: "none" };
        }
        return {};
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={CustomTheme}>
                <Tab.Navigator
                    initialRouteName="ScavengerHuntList"
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.colors.primary },
                        headerTintColor: "#ffffff",
                        tabBarActiveTintColor: theme.colors.primary,
                        tabBarInactiveTintColor: "#888888",
                        tabBarStyle: {
                            backgroundColor: theme.colors.card,
                            paddingVertical: 10, // Adjusted for better spacing
                            height: 80, // Increase the height of the bottom tab bar to 80px
                            borderTopLeftRadius: 20, // Optional: Rounded corners for a modern look
                            borderTopRightRadius: 20, // Optional: Rounded corners for a modern look
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5, // Android shadow effect
                        },
                    }}
                >
                    <Tab.Screen
                        name="ScavengerHuntList"
                        component={StackNavigator}
                        options={({ route }) => ({
                            headerShown: false,
                            tabBarLabel: "Hunts",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="map-search"
                                    color={color}
                                    size={size}
                                />
                            ),
                            // Use helper function to dynamically control tab bar visibility
                            tabBarStyle: getTabBarVisibility(route),
                        })}
                    />
                    <Tab.Screen
                        name="Souvenirs"
                        component={SouvenirScreen}
                        options={{
                            tabBarLabel: "Souvenirs",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="gift-outline"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default BottomTabNavigator;
