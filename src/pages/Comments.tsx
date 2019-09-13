import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, makeStyles, Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { Comment } from '../model/Comment';
import { db } from '../firebase';

export default function Comments(props: any) {
    const classes = styles();
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString ? userString : 'null');

    const [document, setDocument] = useState(props.location.state.document);

    const addComment = (comment: Comment) => {
        const newComments = [
            ...document.comments,
            {
                userName: user.displayName,
                userAvatarUrl: user.photoURL,
                content: comment,
                createdAt: new Date(),
            },
        ];

        db.collection('documents')
            .doc(document.id)
            .update({
                comments: newComments,
            })
            .then(() => {
                setDocument({
                    ...document,
                    comments: newComments,
                });
            });
    };

    return user ? (
        <Container maxWidth="md" className="container">
            <div className={classes.header}>
                <Link to="/documents">
                    <Button className={classes.backButton}>
                        <KeyboardBackspaceIcon fontSize="large" />
                    </Button>
                </Link>

                <h1>Candidate: {document.name}</h1>

                <span></span>
            </div>
            <CommentForm onAddComment={addComment} />
            <CommentList comments={document.comments} />
        </Container>
    ) : (
        <Redirect to="/" />
    );
}

const styles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        fontSize: 20,
    },
});
