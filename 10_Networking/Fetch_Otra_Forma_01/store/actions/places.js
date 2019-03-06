import { ADD_PLACE, DELETE_PLACE } from './actionTypes';


// ESTA ES OTRA FORMA DE HACER HTTP REQUEST MEZCLADO CON FIREBASE
export const addPlace = (placeName, location, image) => {
    // return ( dispatch ) => { ### }
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        };
        // fetch( url/posicion.JSON , CONFIG DEL REQUEST )
        // .catch()   NO ATRAPA ERRORES DE TIPO 5XX NI 4XX
        // .then( res => res.JSON() )     TRANSFORMA EL JSON EN OBJETO
        // .then ( parsedRes => La respuesta ya en modo OBJETO)
        fetch("https://awesome-places-1511248766522.firebaseio.com/places.json", {
            method: "POST",
            // TRANSFORMAR OBJETO EN JSON
            body: JSON.stringify(placeData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};
