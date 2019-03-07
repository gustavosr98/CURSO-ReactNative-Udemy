import { AUTH_SET_TOKEN } from "../actions/actionTypes";

const initialState = {
  token: null
};

// LO UNICO QUE HACE ES GUARDAR EL TOKEN EN EL REDUX STORE
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};

export default reducer;