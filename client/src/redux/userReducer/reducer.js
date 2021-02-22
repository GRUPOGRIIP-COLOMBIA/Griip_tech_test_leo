import * as actions from './constants.js';

const initialState = {
  loggedIn: false,
  loggedUser: null,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOG_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case actions.LOG_OUT:
      return {
        ...state,
        loggedIn: false,
      };
      case actions.GET_LOGGED_USER:
        return {
          ...state,
          loggedUser: action.payload,
        };
    default:
      return state;
  };
};