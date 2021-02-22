import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, getLoggedUser } from '../../redux/userReducer/actions';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './styles';
import logo from '../../images/logo.webp';
import Login from '../Login';
import SignUp from '../SignUp';

export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );

    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = (e) => {
        e.preventDefault();

        axios.get('/api/logout')
            .then(() => {
                dispatch(logOut());
                dispatch(getLoggedUser(null));
            })
            .catch(err => console.log(err));
    };

    const innerModal = (type) => {
        if (type === 'login') {
            return <Login
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };

        if (type === 'join') {
            return <SignUp
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt='Logo' className={classes.logo} />
                    {loggedIn ?
                        <h3
                            className={classes.navButton}
                            onClick={logout}
                        >
                            SALIR
                            </h3>
                        :
                        <div className={classes.rigthNav}>
                            <h3
                                className={classes.navButton}
                                onClick={() => {
                                    setModal('login');
                                    handleOpen();
                                }}
                            >
                                INGRESAR
                            </h3>
                            <h3
                                className={classes.navButton}
                                onClick={() => {
                                    setModal('join');
                                    handleOpen();
                                }}
                            >
                                REGISTRARSE
                            </h3>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {innerModal(modal)}
            </Modal>
        </div>
    );
};