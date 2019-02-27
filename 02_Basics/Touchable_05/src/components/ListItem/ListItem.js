import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TOUCHABLE_ALGO HACE QUE CUALQUIER COSA SEA PRESIONABLE
// HAY MUCHOS MAS TIPOS DE TOUCHABLE
// HAY MUCHAS MAS PROPIEDADADES QUE onPress, disables, onLongPress, onPressIn, OnPressOut
const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      {/* TEXT NO PUEDE LLEVAR STYLE, LA TIENE QUE LLEVAR UN VIEW QUE LO ENVUELVA */}
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee"
  }
});

export default listItem;
