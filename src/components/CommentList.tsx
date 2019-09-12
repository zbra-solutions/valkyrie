import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { Comment } from '../model/Comment';

interface Props {
    comments: Comment[];
}

export default function CommentList(props: Props) {
    const classes = styles();
    const { comments } = props;

    return (
        <ul>
            {comments.map((comment: any, index: number) => {
                const divisor = index > 0 ? classes.divisor : '';

                return (
                    <li className={`${classes.item} ${divisor}`}>
                        <Avatar
                            src={comment.userAvatarUrl}
                            className={classes.avatar}
                        />
                        <span className={classes.user}>{comment.userName}</span>
                        <span className={classes.comment}>
                            {comment.content}
                        </span>
                    </li>
                );
            })}
        </ul>
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
