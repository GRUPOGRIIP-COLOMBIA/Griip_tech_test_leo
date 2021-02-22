import * as actions from './constants.js';

const initialState = {
  reminders: [],
  reminder: null,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_REMINDERS:
      return {
        ...state,
        reminders: action.payload,
      };
    case actions.GET_REMINDER:
      return {
        ...state,
        reminder: action.payload,
      };
    default:
      return state;
  };
};