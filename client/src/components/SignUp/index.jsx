import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, getLoggedUser } from '../../redux/userReducer/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles.js';

export default function SignUp({ changeModal, openModal, closeModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateName = () => {
        if (validateEmail() && validatePassword() && comparePasswords()) {
            return form.name.length > 0;
        };
        return true;
    };

    const validateEmail = () => {
        return /\S+@\S+\.\S+/.test(form.email);
    };

    const validatePassword = () => {
        const regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.{6,})");

        return regex.test(form.password);
    };

    const comparePasswords = () => {
        return passwordCheck === form.password;
    };

    const validateForm = () => {
        return validateEmail() && validatePassword() && comparePasswords() && validateName();
    };

    const resetState = () => {
        setLoading(false);

        setPasswordCheck('');

        setForm({
            name: '',
            email: '',
            password: '',
        });
    };

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const user = {
            name: toTitleCase(form.name),
            email: form.email,
            password: form.password,
        };

        axios.post('/api/newUser', user)
            .then((res) => {
                resetState();

                closeModal();

                dispatch(getLoggedUser(res.data));

                dispatch(logIn());

                Swal.fire({
                    icon: 'success',
                    text: 'Bienvenido!',
                });
            })
            .catch(err => {
                console.log(err);

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
                <h2 className={classes.header}>Registrarse</h2>
                <p className={classes.subHeader}>
                    ¿Tienes cuenta?
                            <span className={classes.subLink} onClick={() => changeModal('login')}> Ingresar</span>
                </p>
            </div>
            <div className={classes.fieldsContainer}>
                <div className={classes.textDiv}>
                    <TextField
                        label="Nombre"
                        name='name'
                        value={form.name}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    {!validateName() &&
                        <span className={classes.error}>Escribe tu nombre</span>
                    }
                </div>
                <div className={classes.textDiv}>
                    <TextField
                        label="Email"
                        name='email'
                        value={form.email}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    {!validateEmail() && form.email.length > 0 &&
                        <span className={classes.error}>Escribe un email válido</span>
                    }
                </div>
                <div className={classes.textDiv}>
                    <TextField
                        label="Contraseña"
                        name='password'
                        value={form.password}
                        type='Password'
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    {!validatePassword() && form.password.length > 0 &&
                        <span className={classes.error}>Mínimo 6 caracteres (letras y números)</span>
                    }
                </div>
                <div className={classes.textDiv}>
                    <TextField
                        label="Repite tu contraseña"
                        value={passwordCheck}
                        type='Password'
                        className={classes.textField}
                        onChange={(e) => {
                            setPasswordCheck(e.target.value);
                        }}
                    />
                    {!comparePasswords() && passwordCheck.length > 0 &&
                        <span className={classes.error}>Las contraseñas no coinciden</span>
                    }
                </div>
                {loading ?
                    <div className={classes.load}>
                        <CircularProgress className={classes.loading} />
                    </div>
                    :
                    <Button
                        variant="contained"
                        disabled={!validateForm()}
                        className={classes.login}
                        onClick={handleSubmit}
                    >
                        Ingresar
                    </Button>
                }
            </div>
        </div>
    );
};