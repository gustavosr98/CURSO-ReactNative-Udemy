import { AsyncStorage } from "react-native";

import { TRY_AUTH, AUTH_SET_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

// CONSTANTES EN MAYUSCULAS POR BUENA PRACTICA
const API_KEY = "AIzaSyCnX8rTPN4YtEZiX5FMYkqQtXJNLu80GPU";

export const tryAuth = (authData, authMode) => {
  return dispatch => {

    dispatch(uiStartLoading());

    // LOGIN O SIGN UP
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
    if (authMode === "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
    }

    // ENVIA EL REQUEST
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        if (!parsedRes.idToken) {
          alert("Authentication failed, please try again!");
        } else {
          // SI TODO BIEN, ALMACENA EL TOKEN
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken
            )
          );
          // INICIA DASHBOARD
          startMainTabs();
        }
      });
  };
};

// ALMACENA EN REDUX Y ASYNC STORE
export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    // REDUX
    dispatch(authSetToken(token));
    // TIEMPO DE EXPIRACION
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    // ASYNC
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

// OBTENER TOKEN
export const authGetToken = () => {
  return (dispatch, getState) => {

    const promise = new Promise((resolve, reject) => {
      // INTENTA OBTENERLO DEL REDUX
      const token = getState().auth.token;

      // SI NO HAY EN REDUX, REVISA EL ASYNC STORE
      if (!token) {
        let fetchedToken;
        // BUSCA TOKEN
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              // SI NO HAY EN EL ASYNC, TERMINA
              reject();
              return;
            }
            // BUSCA EXP DATE
            return AsyncStorage.getItem("ap:auth:expiryDate");
          })

          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();

            // SI YA EXPIRO
            if (parsedExpiryDate > now) {

              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        // SI HAY EN EL REDUX, DEVUELVELO
        resolve(token);
      }
    });


    // DEVUELVE SI HAY O NO HAY TOKEN
    return promise
      .catch(err => {
        // SI NO HAY BUSCA EL REFRESH TOKEN
        return AsyncStorage.getItem("ap:auth:refreshToken")
          .then(refreshToken => {
            // PIDE UN NUEVO TOKEN CON EL REFESH TOKEN
            return fetch(
              "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=refresh_token&refresh_token=" + refreshToken
              }
            );
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              // SE OBTUVO EL NUEVO TOKEN
              console.log("Refresh token worked!");
              // GUARDA EL NUEVO TOKEN
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              // DEVUELVE EL NUEVO TOKEN POR LA  PROMESA
              return parsedRes.id_token;
            } else {
              // SI NO SE PUDO OBTENER EL NUEVO TOKEN, BORRA EL TOKEN DE ASYNC
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

// PARA AUTOINGRESAR INTENTA GET TOKEN
export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};

// BORRA EL TOKEN DE ASYNC
export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
  };
};
