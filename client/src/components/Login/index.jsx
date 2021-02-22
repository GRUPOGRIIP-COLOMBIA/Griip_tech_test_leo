
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, getLoggedUser } from '../../redux/userReducer/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles.js';

export default function Login({ changeModal, openModal, closeModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setError(false);
    };

    const validateForm = () => {

        return form.email.length > 0 && form.password.length > 0;
    };

    const handleClick = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            email: form.email,
            password: form.password,
        };

        axios.post('/api/login', data)
            .then((res) => {
                setLoading(false);

                closeModal();

                dispatch(logIn());

                dispatch(getLoggedUser(res.data));

                Swal.fire({
                    icon: 'success',
                    text: 'Bienvenido!',
                });
            })
            .catch(err => {
                setLoading(false);

                closeModal();

                Swal.fire({
                    icon: 'error',
                    text: err.response.data.errorMessage,
                })
                    .then(() => openModal())
                    .catch(err => console.log(err));
            });
    };

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <h2 className={classes.header}>Ingresar</h2>
                <p className={classes.subHeader}>
                    ¿Eres nuevo?
                            <span className={classes.subLink} onClick={() => changeModal('join')}> Regístrate</span>
                </p>
            </div>
            <div className={classes.fieldsContainer}>
                <TextField
                    label="Email"
                    name='email'
                    value={form.email}
                    className={classes.textField}
                    onChange={handleChange}
                />
                <div className={classes.textDiv}>
                    <TextField
                        label="Contraseña"
                        name='password'
                        type='Password'
                        value={form.password}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    {error &&
                        <span className={classes.error}>Completa todos los campos</span>
                    }
                </div>
                {loading ?
                    <CircularProgress className={classes.loading} />
                    :
                    <Button
                        variant="contained"
                        disabled={!validateForm()}
                        className={classes.login}
                        onClick={handleClick}
                    >
                        Ingresar
                    </Button>
                }
            </div>
        </div>
    );
};