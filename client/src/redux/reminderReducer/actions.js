import * as actions from './constants.js';

export const getReminders = (props) => async (dispatch) => {
    dispatch({
        type: actions.GET_REMINDERS,
        payload: props,
    });
};

export const getReminder = (props) => async (dispatch) => {
    dispatch({
        type: actions.GET_REMINDER,
        payload: props,
    });
};