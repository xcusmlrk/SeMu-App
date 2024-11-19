import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [topTracks, setTopTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTopTracks();
  }, []);

  // Fetch top tracks SEVENTEEN
  const fetchTopTracks = async () => {
    try {
      const response = await fetch("https://api.deezer.com/artist/240582/top");
      const data = await response.json();
      setTopTracks(data.data);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SEVENTEEN - CARAT</Text>
      </View>

      <View style={styles.separator1} />

      <ScrollView>
        <Image
          source={{ uri: "https://cdn.rri.co.id/berita/Pekanbaru/o/1719625175961-20240629_082655/c4u68mpxl3i0cxf.jpeg" }}
          style={styles.headerImage}
        />

        <Text style={styles.titledescription}>🍒 😇 🦌 😺 🐯 🎮 🍚 🐸 🐶 ⚔ 🍊 🐢 🦦</Text>
        <Text style={styles.titledescription}>안녕 캐럿들!</Text>
        <Text style={styles.description}>
          SEVENTEEN MUSIC APP menghadirkan koleksi top track dan album dari Seventeen, serta informasi lengkap tentang para member Seventeen. Nikmati juga fitur pencarian untuk menemukan lagu favoritmu dengan mudah!
        </Text>

        <View style={styles.separator} />

        {/* Section Top Tracks */}
        <Text style={styles.headerTitle}>Top Tracks SEVENTEEN</Text>

        <View style={styles.trackContainer}>
          {topTracks.map((item, index) => (
            <TouchableOpacity
              key={item.id.toString()}
              style={styles.trackItem}
              onPress={() => navigation.navigate("TrackDetail", { trackId: item.id })}
            >
              <Text style={styles.trackNumber}>{index + 1}.</Text>
              <Image source={{ uri: item.album.cover_medium }} style={styles.trackImage} />
              <Text style={styles.trackTitle}>{item.title}</Text>
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
    backgroundColor: "white",
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
  headerImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  titledescription: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
    textAlign: "center",
  },
  trackContainer: {
    paddingBottom: 85, // Adds bottom padding to the container
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  trackNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 8,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default HomeScreen;
