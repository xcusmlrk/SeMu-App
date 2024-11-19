import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { data } from "../data/datamember";
import Card from "../components/CardMember";

function Members() {
  const [numColumns, setNumColumns] = useState(4); 

  const toggleColumns = () => {
    setNumColumns((prevColumns) => (prevColumns === 4 ? 2 : 4));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SEVENTEEN MEMBERS</Text>
      </View>
      
      <View style={styles.separator1} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <Card dataNama={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={numColumns} 
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    marginTop: 10,
  },
  headerContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    color: "#333333",
  },
  separator1: {
    height: 1,
    backgroundColor: "#92a8d1",
    marginVertical: 16,
  },
  gridContainer: {
    paddingBottom: 16,
  },
});

export default Members;
