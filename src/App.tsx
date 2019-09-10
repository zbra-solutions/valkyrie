import React from 'react';
import {
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router';

import Routes from './routes';
import './App.css';
import { auth } from './firebase';
import logo from './assets/logo.png';

function App(props: any) {
    const classes = useStyles();

    const signOut = () => {
        auth.signOut();
        localStorage.removeItem('user');
        props.history.push('/');
    };

    const loggedIn = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString ? userString : '""');

        if (user) return true;
        else return false;
    };

    return (
        <>
            {loggedIn() && (
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.app}>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <span className={classes.appName}>VALKYRIE</span>
                        </div>
                        <img
                            src={logo}
                            alt="Logo"
                            height="32"
                            className={classes.logo}
                        />
                        <Button color="inherit" onClick={signOut}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            )}
            <main>
                <Container maxWidth="md">
                    <Routes />
                </Container>
            </main>
        </>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        background: '#2c465f',
    },
    logo: {
        borderRadius: 4,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    app: {
        display: 'flex',
        alignItems: 'center',
    },
    appName: {
        fontSize: '0.9rem',
        fontWeight: 500,
        letterSpacing: '0.02857em',
    },
}));

export default withRouter(App);
