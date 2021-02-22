import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useStyles } from './styles';

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.footerDiv}>
                        <p className={classes.text}>Esta app fue desarrollada por Leonardo Kuinoso Cifuentes para Griip</p>
                    </div>
                    <div className={classes.footerDiv}>
                        <Tooltip title='Github Repository'>
                            <a
                                href='https://github.com/Kuinoso/griip-tect-test'
                                target='blank'
                                className={classes.gitLogo}
                            >
                                <GitHubIcon title='Github Repository' />
                            </a>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};