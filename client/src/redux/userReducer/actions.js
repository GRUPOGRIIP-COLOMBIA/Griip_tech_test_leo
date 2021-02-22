
import * as actions from './constants.js';

export const logIn = () => async (dispatch) => {
    dispatch({
        type: actions.LOG_IN,
    });
};

export const logOut = () => async (dispatch) => {
    dispatch({
        type: actions.LOG_OUT,
    });
};

export const getLoggedUser = (props) => async (dispatch) => {
    dispatch({
        type: actions.GET_LOGGED_USER,
        payload: props,
    });
};