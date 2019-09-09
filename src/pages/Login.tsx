import React from 'react';
import { Button, Container } from '@material-ui/core';
import { authState } from 'rxfire/auth';

import { auth, googleProvider } from '../firebase';

export default function Login(props: any) {
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
        <Container maxWidth="sm" className="container center">
            <h1>Valkyrie</h1>
            <Button variant="contained" color="secondary" onClick={login}>
                Sign-In with Google
            </Button>
        </Container>
    );
}
