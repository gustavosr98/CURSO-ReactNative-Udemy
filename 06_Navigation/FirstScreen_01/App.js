import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";

// REGISTRAR PANTALLAS
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);

// INICIAR APP
// CON ESTE ES UNA APP SINGLE PAGE
// ESTE METODO TIENE MILES DE OPCIONES
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});

// ADEMAS DE ESTOS ARCHIVOS FALTA 
  // LA CONFIGURACION INICIAL DE CUALQUIER LIBRERIA DE 3EROS
  // LA CONFIGURACION ADICIONAL DE LA LIBRERIA REACT-NATIVE-NAVIGATION