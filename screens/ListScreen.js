function ListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("HuntInfoScreen", { huntId: item.id })}
    >
      <Card style={styles.card}>
        <Text>{item.title}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={huntsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
