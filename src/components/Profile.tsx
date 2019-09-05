import React from 'react';
import { Avatar, Typography } from '@material-ui/core';

interface ProfileProps {
    user: firebase.User;
}

export default function Profile(props: ProfileProps) {
    const divStyle = {
        display: 'flex',
    };

    return (
        <>
            {props.user && props.user.photoURL && (
                <div style={divStyle}>
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
    avatar: {
        marginRight: '10px',
    },
};
