import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";

class PickLocation extends Component {
  state = {
    focusedLocation: {
      // ESTA PARTE DEBE SER TAL CUAL LOS NOMBRES DE LOS ATRIBUTOS
      latitude: 37.7900352,
      longitude: -122.4013726,
      // latitudeDelta: TamanoX
      latitudeDelta: 0.0122,
      longitudeDelta:
        // longitudeDelta: aspectRatio * TamanoX
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false
  };

  pickLocationHandler = event => {
    // event.nativeEvent
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

  render() {
    // MAP MARKER - EL PIN EN UNA LOCATION
    // REVISAR DOCS PARA MAS OPCIONES EN <MapView.Marker> Y <MapView> REACT NATIVE MAPS
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert("Pick Location!")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
