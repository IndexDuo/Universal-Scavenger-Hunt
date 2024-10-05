// screens/ListScreen.js
import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const DATA = [
    { id: "1", title: "Hunt #1: Find the Entrance Sign" },
    { id: "2", title: "Hunt #2: Ride the Jurassic Park Ride" },
    { id: "3", title: "Hunt #3: Take a Picture with a Mascot" },
];

function ListScreen({ navigation }) {
    // Function to render each hunt item
    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.huntItem}
                onPress={() =>
                    navigation.navigate("HuntInfoScreen", {
                        huntTitle: item.title,
                    })
                }
            >
                <Text style={styles.huntTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scavenger Hunts</Text>
            <FlatList
                data={DATA}
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
    },
    huntItem: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    huntTitle: {
        fontSize: 18,
    },
});

export default ListScreen;
