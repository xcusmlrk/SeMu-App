import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AlbumDetail = ({ route, navigation }) => {
  const { albumId } = route.params;
  const [albumDetails, setAlbumDetails] = useState(null);

  useEffect(() => {
    fetchAlbumDetails();
  }, []);

  const fetchAlbumDetails = async () => {
    try {
      const response = await fetch(`https://api.deezer.com/album/${albumId}`);
      const data = await response.json();
      setAlbumDetails(data);
    } catch (error) {
      console.error('Error fetching album details:', error);
    }
  };

  if (!albumDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Ikon panah kembali */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#f7cac9" />
      </TouchableOpacity>
      
      <Image source={{ uri: albumDetails.cover_medium }} style={styles.albumImage} />
      <Text style={styles.albumTitle}>{albumDetails.title}</Text>
      <Text style={styles.artistName}>Artist: {albumDetails.artist.name}</Text>
      <Text style={styles.releaseDate}>Release Date: {albumDetails.release_date}</Text>
      
      <View style={styles.separator} />

      <Text style={styles.trackListTitle}>Track List:</Text>
      <View style={styles.trackListContainer}>
        {albumDetails.tracks.data.map((track, index) => (
          <Text key={track.id} style={styles.track}>
            {index + 1}. {track.title}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 5,
    top: 24,
    left: 16,
    zIndex: 1,
  },
  albumImage: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 50,
    marginBottom: 20,
  },
  albumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  artistName: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    marginBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  trackListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  trackListContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  track: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
});

export default AlbumDetail;
