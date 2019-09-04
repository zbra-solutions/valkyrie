import React, { useState } from 'react';
import './App.css';
import { auth, googleProvider } from './firebase';
import { authState } from 'rxfire/auth';
import Button from '@material-ui/core/Button';
import Profile from './components/Profile';
import DocumentList from './components/DocumentList';

function App() {
    let [user, setUser] = useState();
    authState(auth).subscribe(u => setUser(u));

    const login = () => {
        auth.signInWithPopup(googleProvider);
    };

    return (
        <>
            {user && (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => auth.signOut()}
                    >
                        Logout
                    </Button>
                    <Profile user={user} />
                    <DocumentList />
                </>
            )}
            {!user && (
                <Button variant="contained" color="secondary" onClick={login}>
                    Sign-In with Google
                </Button>
            )}
        </>
    );
}

export default App;
