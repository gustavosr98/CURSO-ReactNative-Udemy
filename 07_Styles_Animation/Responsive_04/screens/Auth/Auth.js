import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";

// HACIENDO RESPOSIVE DESIGN CON DIMENSION API, STATE Y CONDICIONALES

class AuthScreen extends Component {
  // STATE PARA ESTAR ATENTO A CAMBIOS EN PANTALLA
  state = {
    // ME PARECE QUE SI FUERA UN BOOLEANO SERIA MEJOR
    // ASI SE PUDIERAN HACER MAS CORTOS LOS OPERADORES TERNARIOS
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };

  constructor(props) {
    super(props);
    // AGREGAR LISTENER DE CAMBIOS DE DIMENSION
    // SE ACTIVA AL GIRAR LA PANTALLA
    Dimensions.addEventListener("change", this.updateStyles);
  }

  // ELIMINAR EL LISTENER, SINO QUEDA POR AHI ACTIVO
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  // METODO QUE SE EJECUTA CON CADA GIRO DE PANTALLA
  updateStyles = (dims) => {
    this.setState({
      viewMode:
        dims.window.height > 500 ? "portrait" : "landscape"
    });
  }

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    let headingText = null;

    // APROVECHARSE DEL CONDICIONAL DEL TIPO DE PANTALLA PARA MOSTAR/NO MOSTRAR ALGUN ELEMENTO
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
            />
            <View
              style={
                this.state.viewMode === "portrait"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === "portrait"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View
                style={
                  // APROVECHARSE DEL CONDICIONAL DEL TIPO DE PANTALLA PARA USAR UN ESTILO U OTRO
                  this.state.viewMode === "portrait"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  // DOS VERSIONES POR CADA ELEMENTO (EL QUE LO NECEISTE), UNA PARA PANTALLA HORIZONTAL Y OTRA VERTICAL
  // landscapeElementoX
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // potraitElementoX
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});

export default AuthScreen;
