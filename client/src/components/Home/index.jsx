import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import calendar from '../../images/calendar.png';

export default function Home() {
    const classes = useStyles();
    const history = useHistory();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );

    useEffect(() => {
        if (loggedIn) {
            history.push('/panel');
        };
    }, [loggedIn]);

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Recordatorios</h1>
            <div className={classes.banner}>
                <h4>Organiza tu día</h4>
                <img src={calendar} alt='Calendar' className={classes.calendar}/>
                <p className={classes.text}>Con nuestro sistema de recordatorios puedes agendar tus citas, 
                    tareas y eventos de forma fácil y eficiente.</p>
            </div>
        </div>
    );
};