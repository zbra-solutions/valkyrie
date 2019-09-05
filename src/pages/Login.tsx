import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { authState } from 'rxfire/auth';

import { auth, googleProvider } from '../firebase';

export default function Login(props: any) {
    let [user, setUser] = useState();

    authState(auth).subscribe(u => {
        if (u) {
            setUser(u);
            localStorage.setItem('user', JSON.stringify(u));
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

const styles = {
    container: {
        display: 'flex',
        'flex-direction': 'column',
        justifyContent: 'center',
        alignItems: 'center',

        margin: '70px auto',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '15px',
        background: '#fff',
    },
};
