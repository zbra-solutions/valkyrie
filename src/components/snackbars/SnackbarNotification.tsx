import React, { SyntheticEvent } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

export interface SnackbarNotificationProps {
    variant: 'error';
    message: string;
    open: boolean;
    handleClose: () => void;
}

export default function SnackbarNotification(props: SnackbarNotificationProps) {
    const { variant, message, open, handleClose } = props;

    function onClose(event?: SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        handleClose();
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <SnackbarContentWrapper
                onClose={onClose}
                variant={variant}
                message={message}
            />
        </Snackbar>
    );
}

interface SnackbarContentProps {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
}

const variantIcon = {
    error: ErrorIcon,
};

export function SnackbarContentWrapper(props: SnackbarContentProps) {
    const classes = useStyles();
    const { message, onClose, variant } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classes[variant]}
            message={
                <span className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
        />
    );
}

const useStyles = makeStyles({
    error: {
        backgroundColor: '#D32F2F',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: '8px',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});
