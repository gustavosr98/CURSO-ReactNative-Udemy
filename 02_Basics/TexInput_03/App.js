import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class App extends Component {
  // DEFINICION DEL STATE
  state = {
    placeName: ""
  };

  // EL METHOD().BIND(THIS) SE HACE AUTOMATICO CON LOS METODOS DEFINIDOS COMO EL DE ABAJO 
  placeNameChangedHandler = val => {
    // EL MANEJO DE STATES ES IGUAL A REACTJS
    this.setState({
      placeName: val
    });
  };

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={{width: 300}}
          placeholder="An awesome place"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
        />
      </View>
    );
  }
}

// ESTE ES COMO EL CSS
const styles = StyleSheet.create({
  container: {
    flex: 1, // TAMANO QUE OCUPA DEL DISPONIBLE 
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start" // DONDE COMIENZA EL CONJUNTO
  }
});
