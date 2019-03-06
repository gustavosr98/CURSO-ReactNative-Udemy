import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        // AL SUBIR LAS F() A LA NUBE CON $firebase deploy
        // ME DA UNA LISTA CON LOS LINKS DE CADA METODO DEL API
        // USER EL LINK DEL METODO AGREGAR_LUGAR() EN EL FETCH
        fetch("https://us-central1-awesome-places-1511248766522.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                // EN CASO DE QUE LA IMAGEN SE SUBA, ALMACENO EL LINK DE LA IMAGEN
                image: parsedRes.imageUrl
            };
            // SUBO EL RESTO DE LA INFORMACION A FIREBASE REALTIME DATABASE
            // QUE SI EL NOMBRE, LOCATION ...
            return fetch("https://awesome-places-1511248766522.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })  
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            // CUANDO SE HAYA SUBIDO LA IMAGEN Y TAMBIEN LOS DATOS
            console.log(parsedRes);
        });
    };
};

// IMAGEN -> FIREBASE STORAGE
// RESTO DE DATOS -> FIREBASE REALTIME DATABASE
