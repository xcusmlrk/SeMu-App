import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TrackDetail = ({ route, navigation }) => {
  const { trackId } = route.params;
  const [trackDetails, setTrackDetails] = useState(null);

  useEffect(() => {
    fetchTrackDetails();
  }, []);

  const fetchTrackDetails = async () => {
    try {
      const response = await fetch(`https://api.deezer.com/track/${trackId}`);
      const data = await response.json();
      setTrackDetails(data);
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  if (!trackDetails) {
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
      
      <Image source={{ uri: trackDetails.album.cover_medium }} style={styles.trackImage} />
      <Text style={styles.trackTitle}>{trackDetails.title}</Text>
      <Text style={styles.artistName}>Artist: {trackDetails.artist.name}</Text>
      <Text style={styles.albumName}>Album: {trackDetails.album.title}</Text>
      <Text style={styles.releaseDate}>Release Date: {trackDetails.release_date}</Text>
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
  trackImage: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 50,
    marginBottom: 20,
  },
  trackTitle: {
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
  albumName: {
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
});

export default TrackDetail;
