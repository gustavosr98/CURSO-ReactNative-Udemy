import { AsyncStorage } from "react-native";

import startMainTabs from "../../screens/MainTabs/startMainTabs";

// GUARDAR TOKEN EN ASYNC STORE (PERSISTENTE)
export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        // GUARDAR TOKEN EN REDUX STORE
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    };
  };
  
// GUARDAR TOKEN EN REDUX STORE    
export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

// *******************************

// AUTO SIGN IN
export const authAutoSignIn = () => {
    return dispatch => {
        // INTENTA OBTENER EL TOKEN DE ASYNC STORE
        dispatch(authGetToken())
        .then(token => {
            // SI LO OBTIENE ABRE EL DASHBOARD
            startMainTabs();
        })
        .catch(err => console.log("Failed to fetch token!"));
    };
};

// LIMPIAR EL ASYN STORE
export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
    }
}
