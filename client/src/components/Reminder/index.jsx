import React from 'react';
import { useDispatch } from 'react-redux';
import { getReminder } from '../../redux/reminderReducer/actions';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

export default function Reminder({ title, body, expires, user , id}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        const reminder = {
            title, 
            body,
            expires,
            user,
            id,
        };

        dispatch(getReminder(reminder));

        history.push('/recordatorio');
    };

    return (
        <div className={classes.container} onClick={handleClick}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.date}>
                <p>{new Date(expires).getDate()}/{new Date(expires).getMonth() + 1}/{new Date(expires).getFullYear()}</p>
                <p>{new Date(expires).getHours()}:{new Date(expires).getMinutes() === 0 ? '00' : new Date(expires).getMinutes()}</p>
            </div>
        </div>
    );
};