import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTracks, setFilteredTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTopTracks();
  }, []);

  // Fetch data dari API Deezer Chart Trending Tracks
  const fetchTopTracks = async () => {
    try {
      const response = await fetch('https://api.deezer.com/chart');
      const data = await response.json();
      setTopTracks(data.tracks.data);
      setFilteredTracks(data.tracks.data);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

  // Handle pencarian track berdasarkan judul lagu
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      // Jika input kosong, tampilkan kembali trending tracks default
      setFilteredTracks(topTracks);
      return;
    }

    try {
      const response = await fetch(`https://api.deezer.com/search/track?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setFilteredTracks(data.data); // Set hasil pencarian
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Search Bar */}
        <Text style={styles.headerTitle1}>Search</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="What song do you want to listen?"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <ScrollView style={styles.container2}>
        {/* Section Trending Tracks */}
        <Text style={styles.headerTitle}>Trending Tracks</Text>
        <View style={styles.tracksContainer}>
          {filteredTracks.map((item) => (
            <TouchableOpacity 
              key={item.id.toString()} 
              style={styles.trackItem} 
              onPress={() => navigation.navigate("TrackDetail", { trackId: item.id })}
            >
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
    backgroundColor: "#ffffff",
  },
  container2: {
    flex: 1,
    marginBottom: 75,
    backgroundColor: "#ffffff",
  },
  headerTitle1: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 20,
    color: "#333333",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  tracksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  trackItem: {
    width: "48%", // Menjamin elemen memiliki lebar hampir setengah layar
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
});

export default SearchPage;
