import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

class SideDrawer extends Component {
  // AQUI SE VE COMO PONER MULTIPLES STYLES A UN ELEMENTO
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <Text>SideDrawer</Text>
      </View>
    );
  }
}

// ESTO ES NECESARIO PARA EL DRAWER EN ANDROID
const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1
  }
});

export default SideDrawer;
