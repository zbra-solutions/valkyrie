import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import { Redirect } from 'react-router';

export default function Comments(props: any) {
    const classes = styles();
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString ? userString : 'null');
    const comments = [
        {
            userAvatarUrl:
                'https://lh3.googleusercontent.com/-ZOjm0B0ha5o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdAq-aEI-DfH1pSQkBbsfhMnfTNAg/photo.jpg',
            userName: 'Bruno Silva',
            content: 'Bom demais esse garoto',
            createdAt: new Date(),
        },
        {
            userAvatarUrl:
                'https://lh3.googleusercontent.com/-ZOjm0B0ha5o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdAq-aEI-DfH1pSQkBbsfhMnfTNAg/photo.jpg',
            userName: 'Bruno Silva',
            content: 'Bom demais esse garoto',
            createdAt: new Date(),
        },
    ];

    return user ? (
        <Container maxWidth="md" className="container">
            <h1>Uira Veríssimo</h1>
            <ul>
                {comments.map((comment: any, index: number) => {
                    const divisor = index > 0 ? classes.divisor : '';

                    return (
                        <li className={`${classes.item} ${divisor}`}>
                            <Avatar
                                src={comment.userAvatarUrl}
                                className={classes.avatar}
                            />
                            <span className={classes.user}>
                                {comment.userName}
                            </span>
                            <span className={classes.comment}>
                                {comment.content}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </Container>
    ) : (
        <Redirect to="/" />
    );
}

const styles = makeStyles({
    avatar: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    item: {
        display: 'flex',
        alignItems: 'center',

        padding: '15px 0',
    },
    user: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 18,
    },
    comment: {
        fontSize: 16,
        color: '#555',
    },
    divisor: {
        borderTop: '1px solid #ddd',
    },
});
