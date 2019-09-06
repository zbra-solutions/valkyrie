import React from 'react';
import { Avatar, Typography } from '@material-ui/core';

interface ProfileProps {
    user: firebase.User;
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            {props.user && props.user.photoURL && (
                <div style={styles.container}>
                    <Avatar src={props.user.photoURL} style={styles.avatar} />
                    <Typography variant="h4" gutterBottom>
                        Welcome, {props.user.displayName}
                    </Typography>
                </div>
            )}
        </>
    );
}

const styles = {
    container: {
        display: 'flex',
        marginBottom: '20px',
    },
    avatar: {
        marginRight: '10px',
    },
};
