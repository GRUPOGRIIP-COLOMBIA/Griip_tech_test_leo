import 'date-fns';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReminders } from '../../redux/reminderReducer/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import Reminder from '../Reminder';


export default function Panel() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );
    const user = useSelector(
        (store) => store.UserReducer.loggedUser
    );
    const reminders = useSelector(
        (store) => store.ReminderReducer.reminders
    );

    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [form, setForm] = useState({
        title: '',
        body: '',
    });
    
    useEffect(() => {
        if (!loggedIn) {
            history.push('/');
        };
    }, [loggedIn]);

    useEffect(() => {
        axios.get(`/api/userReminders/${user}`)
        .then(res => {
            dispatch(getReminders(res.data));
        })
        .catch(err => console.log(err));
    }, []);

    const handleDateChange = (date) => {
        const num = date.getTime();
        setSelectedDate(num);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setSelectedDate(Date.now());
        setForm({
            title: '',
            body: '',
        });
    };

    const validateForm = () => {
        return form.title && form.body;
    };

    const handleClick = () => {
        const data = {
            title: form.title,
            body: form.body,
            expires: selectedDate,
            user: user,
        };

        axios.post('/api/newReminder', data)
            .then(res => {
                dispatch(getReminders(res.data));

                resetForm();

                Swal.fire({
                    icon: 'success',
                    text: 'Recordatorio agregado!',
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={classes.container}>
            <div className={classes.leftDiv}>
                <h1 className={classes.header}>Agregar recordatorio</h1>
                <div className={classes.form}>
                    <TextField
                        label="Título"
                        name='title'
                        value={form.title}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Descripción"
                        name='body'
                        value={form.body}
                        className={classes.body}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className={classes.date}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className={classes.date}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button
                        variant="contained"
                        disabled={!validateForm()}
                        className={classes.login}
                        onClick={handleClick}
                    >
                        Agregar
                    </Button>
                </div>
            </div>
            <div className={classes.rigthDiv}>
                <h1 className={classes.rightTitle}>Mis recordatorios</h1>
                <div className={classes.reminders}>
                    {reminders && reminders.map((item, i) =>
                        <Reminder
                            key={i}
                            title={item.title}
                            body={item.body}
                            expires={item.expires}
                            user={item.user}
                            id={item._id}
                        />
                    )}
                    {reminders.length === 0 && 
                    <div>
                        <h3 className={classes.rightTitle}>No tienes recordatorios!</h3>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};