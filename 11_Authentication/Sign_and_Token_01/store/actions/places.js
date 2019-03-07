import { SET_PLACES, REMOVE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

// OBTENER LUGARES DE DB
export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then( token => {
        // ESTO RETORNA UNA PROMESA
        // IMPORTANTE DEL LINK -> URL/METODO ?auth=${token}
        return fetch(`https://awesome-places-1511248766522.firebaseio.com/places.json?auth=${token}`);
      })
      .catch(() => {
        // ERROR EN EL TOKEN
        alert("No valid token found!");
      })

      // LA PROMESA ES CAPTURADA AQUI
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        // GUARDAR PLACES DE MANERA LOCAL
        dispatch(setPlaces(places));
      })
      .catch(err => {
        // ERROR CAPTURANDO LA LISTA DE PLACES
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

// GUARDAR PLACES DE MANERA LOCAL
export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

// *******************************************************************************

// ESTE NO ESTA FUNCIONANDO TODAVIA
// COMO UTILIZA CLOUDFUNCIONS, CUALQUIER PERSONA PUEDE ACCEDER A LAS IMAGENES
// EN EL PROXIMO VIDEO VERE COMO PRIVATIZAR LAS IMAGENES
export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        return fetch(
          // AQUI SE PUEDE VER QUE ES CLOUD FUNCTION PARA LA IMAGEN
          "https://us-central1-awesome-places-1511248766522.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            })
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        return fetch(
          "https://awesome-places-1511248766522.firebaseio.com/places.json",
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      });
  };
};


// *****************************************************
// ES MUY PARECIDO A GET PLACES
export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          "https://awesome-places-1511248766522.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
