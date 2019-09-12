import React, { useState } from 'react';
import { Fab, TextField, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { storageRef } from '../firebase';
import { db } from '../firebase';

export default function CommentForm(props: any) {
    const [comment, setComment] = useState();

    const classes = styles();

    const onChangeComment = (event: any) => {
        setComment(event.target.value);
    };

    // const addComment = (comment: Comment) => {
    //     const doc = db.collection('documents').doc(document.id);
    //     console.log(doc);

    //     db.collection('documents')
    //         .doc(document.id)
    //         .update({
    //             comments: [...document.comments],
    //         });
    // };

    return (
        <form className={classes.container}>
            <TextField
                label="Add a comment"
                name="comment"
                value={comment}
                onChange={onChangeComment}
                className={classes.inputComment}
            />
            <Fab
                color="primary"
                size="small"
                aria-label="add"
                className="add-button"
                onClick={() => props.onAddComment(comment)}
            >
                <AddIcon />
            </Fab>
        </form>
    );
}

const styles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    inputComment: {
        flex: 1,
    },
});
