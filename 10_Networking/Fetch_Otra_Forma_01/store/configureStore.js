import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// EN ESTE ARCHIVO HAY QUE AGREGAR EL REDUX THUNK
// ES UN MIDDLEWARE QUE SIRVE PARA HACER PETICIONES ASYNC CON REDUX
// RECORDAR INSTALARLO CON NPM INSTALL

import placesReducer from "./reducers/places";

const rootReducer = combineReducers({
  places: placesReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// ESTA ES LA PARTE IMPORTANTE, DONDE SE AGREGA LO DE REDUX-THUNK
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
