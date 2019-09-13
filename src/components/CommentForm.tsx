import React, { useState } from 'react';
import { Fab, TextField, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function CommentForm(props: any) {
    const [comment, setComment] = useState();

    const classes = styles();

    const onChangeComment = (event: any) => {
        setComment(event.target.value);
    };

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
                onClick={() => {
                    props.onAddComment(comment);
                    setComment('');
                }}
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
