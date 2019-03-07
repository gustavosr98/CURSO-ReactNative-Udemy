import { TRY_AUTH, AUTH_SET_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

// MISMO METODO PARA LOGIN Y SIGN UP
export const tryAuth = (authData, authMode) => {
  return dispatch => {

    // FEEDBACK PARA EL USUARIO - START RUEDITA DE LOADING
    dispatch(uiStartLoading());

    // API KEY DEL PROYECTO EN FIREBASE
    const apiKey = "AIzaSyCnX8rTPN4YtEZiX5FMYkqQtXJNLu80GPU";

    // URL DE SIGNUP ES DIFERENTE AL DE LOGIN EN EL NOMBRE DEL METODO
    let url = ``;
    if (authMode === "signup") {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    } else {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    }

    // ENVIAR REQUEST
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
        // ERROR DE CONEXION
        console.log(err);

        // ENVIO MENSAJE DE ALERTA AL USUARIO
        alert("Authentication failed, please try again!");

        // FEEDBACK PARA EL USUARIO - STOP RUEDITA DE LOADING
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        // SE CAPTURA LA RESPONSE

        // FEEDBACK PARA EL USUARIO - STOP RUEDITA DE LOADING
        dispatch(uiStopLoading());


        console.log(parsedRes);

        if (!parsedRes.idToken) {
          // ERROR DE AUTENTIFICACION, CONTRASENA INVALIDA O ALGO ASI
          alert("Authentication failed, please try again!");
        } else {
          // SE INICIO SESION O REGISTRO CORRECTAMENTE

          // GUARDO EL TOKEN EN EL STORE DE REDUX
          dispatch(authSetToken(parsedRes.idToken));
          // INICIO EL DASHBOARD DE LA APP
          startMainTabs();
        }
      });
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

// OBTENER EL TOKEN DEL STORE REDUX, ESTA ASI PARA PODER USARLO EN actions/places.js Y CUALQUEIR OTRO LADO
export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        // SE RETORNA UNA PROMESA  
        return promise;
    };
};
