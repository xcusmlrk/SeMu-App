import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ dataNama }) => {
  const imageUrl = dataNama.imageUrl
    ? dataNama.imageUrl
    : "";

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{dataNama.nama}</Text>
      <Text style={styles.position}>{dataNama.position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "23%", // Four columns with spacing
    margin: "1%", // Spacing between items
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 70, 
    height: 70, 
    borderRadius: 50, 
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  position: {
    fontSize: 12,
    color: "#555555",
    textAlign: "center",
    marginTop: 4,
  },
});

export default Card;
