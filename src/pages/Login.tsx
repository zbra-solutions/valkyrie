import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { authState } from 'rxfire/auth';

import { auth, googleProvider } from '../firebase';

export default function Login(props: any) {
    const classes = useStyles();

    authState(auth).subscribe(user => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            props.history.push('/documents');
        }
    });

    const login = () => {
        auth.signInWithPopup(googleProvider);
    };

    return (
        <div className={classes.container}>
            <h1>VALKYRIE</h1>
            <Button variant="contained" color="primary" onClick={login}>
                Sign-In with Google
            </Button>
        </div>
    );
}


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,

        margin: '100px auto',
        maxWidth: '600px',
        borderRadius: '5px',
        padding: '30px',
        boxShadow: '0px 0px 12px 0px rgba(0,0,0,0.4)',
    }
}));
