import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const navigation = useNavigation();

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`https://api.deezer.com/artist/240582/albums`);
      const data = await response.json();
      setAlbums(data.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Albums Library</Text>
      </View>

      <View style={styles.separator1} />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.albumsContainer}>
          {albums.map((item) => (
            <TouchableOpacity 
              key={item.id.toString()} 
              style={styles.albumItem} 
              onPress={() => navigation.navigate("AlbumDetail", { albumId: item.id })}
            >
              <Image source={{ uri: item.cover_medium }} style={styles.albumImage} />
              <View style={styles.titleContainer}>
                <Text style={styles.albumTitle}>{item.title}</Text>
                <Text style={styles.albumReleaseDate}>Release Date: {item.release_date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  albumsContainer: {
    marginBottom: 85,
  },
  albumItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  albumImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  albumReleaseDate: {
    fontSize: 14,
    color: "#666666",
  },
});

export default Album;
