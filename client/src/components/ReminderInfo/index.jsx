import 'date-fns';
import React, { useState } from 'react';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStyles } from './styles';

export default function ReminderInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const reminder = useSelector(
        (store) => store.ReminderReducer.reminder
    );

    const [edit, setEdit] = useState(false);
    const [selectedDate, setSelectedDate] = useState(reminder.expires);
    const [form, setForm] = useState({
        title: reminder.title,
        body: reminder.body,
    });
    const [date] = useState({
        day: new Date(reminder.expires).getDate(),
        month: new Date(reminder.expires).getMonth() + 1,
        year: new Date(reminder.expires).getFullYear(),
        hour: new Date(reminder.expires).getHours(),
        minutes: new Date(reminder.expires).getMinutes() === 0 ? '00' : new Date(reminder.expires).getMinutes(),
    });

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

    const validateForm = () => {
        return form.title && form.body;
    };

    const handleEdit = () => {
        const data = {
            title: form.title,
            body: form.body,
            expires: selectedDate,
        };

        axios.put(`/api/updateReminder/${reminder.id}`, data)
            .then(res => {
                dispatch(getReminders(res.data));

                Swal.fire({
                    icon: 'success',
                    text: 'Recordatorio editado!',
                }).then(() => history.push('/panel'));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = () => {
        Swal.fire({
            title: '¿Deseas eliminar este recordatorio?',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/deleteReminder/${reminder.id}`)
                    .then((res) => {
                        dispatch(getReminders(res.data));

                        Swal.fire({
                            icon: 'success',
                            text: 'Recordatorio eliminado!',
                        }).then(() => history.push('/panel'));
                    });
            };
        })
    };

    return (
        <div className={classes.wrapper}>
            {!edit ?
                <div className={classes.container}>
                    <ArrowBackIcon className={classes.back} onClick={() => history.push('/panel')} />
                    <h2 className={classes.title}>{reminder.title}</h2>
                    <p>{reminder.body}</p>
                    <div className={classes.date}>
                        <p>{date.day}/{date.month}/{date.year}</p>
                        <p>{date.hour}:{date.minutes}</p>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => setEdit(true)}
                        >
                            EDITAR
                    </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={handleDelete}
                        >
                            ELIMINAR
                    </Button>
                    </div>
                </div>
                :
                <div className={classes.editContainer}>
                    <h1 className={classes.header}>Editar recordatorio</h1>
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
                                    className={classes.dates}
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
                                    className={classes.dates}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <div>
                            <Button
                                variant="contained"
                                disabled={!validateForm()}
                                className={classes.login}
                                onClick={handleEdit}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.login}
                                onClick={() => setEdit(false)}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};