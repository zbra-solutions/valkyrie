import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { authState } from 'rxfire/auth';
import Button from '@material-ui/core/Button';
import Profile from '../components/Profile';
import DocumentList from '../components/DocumentList';
import DocumentForm from '../components/DocumentForm';
import { Container, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { Redirect } from 'react-router';

const ColorButton = withStyles(theme => ({
    root: {
        color: '#fff',
        backgroundColor: '#7159c1',
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

export default function Main(props: any) {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString ? userString : 'null');

    const signOut = () => {
        auth.signOut();
        localStorage.removeItem('user');
        props.history.push('/');
    };

    return user ? (
        <Container maxWidth="md" className="container">
            <Profile user={user} />
            <DocumentForm />
            <DocumentList />

            <ColorButton
                variant="contained"
                color="primary"
                onClick={signOut}
                style={styles.logoutButton}
            >
                Logout
            </ColorButton>
        </Container>
    ) : (
        <Redirect to="/" />
    );
}

const styles = {
    logoutButton: {
        marginTop: '30px',
    },
};
