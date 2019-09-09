import React from 'react';
import { Container } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router';

const styles = makeStyles({});

export default function Comments(props: any) {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString ? userString : 'null');
    const comments = [];

    return user ? (
        <Container maxWidth="md" className="container">
            <h1>Uira Veríssimo</h1>
            <ul>
                <li>
                    <Avatar src={user.photoURL} />
                </li>
                <li>bom</li>
                <li>ruim</li>
                <li>Muito ruim</li>
            </ul>
        </Container>
    ) : (
        <Redirect to="/" />
    );
}
