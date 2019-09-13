import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import { storageRef } from '../firebase';
import { db } from '../firebase';

export default function DocumentForm() {
    let [name, setName] = useState();
    let [document, setDocument] = useState();
    let [fileName, setFileName] = useState();

    const collection = db.collection('documents');

    const onChangeFileHandler = (event: any) => {
        if (event.target.files[0]) {
            setDocument(event.target.files[0]);
            setFileName(event.target.files[0].name);
        }
    };

    const submit = async () => {
        if (document) {
            const link = await upload();
            collection.add({
                name,
                link,
                comments: []
            });

            setName('');
            setDocument(null);
            setFileName('');
        }
    };

    const upload = () => {
        return storageRef
            .child(document.name)
            .put(document)
            .then((snapshot: any) => snapshot.ref.getDownloadURL())
            .catch((error: any) => console.log(error));
    };

    const onChangeName = (event: any) => {
        setName(event.target.value);
    };

    return (
        <form style={styles.container}>
            <div>
                <TextField
                    label="Name"
                    value={name}
                    onChange={onChangeName}
                    style={styles.inputName}
                />
                <input
                    accept=".pdf,image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={onChangeFileHandler}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Choose document
                    </Button>

                    <span style={styles.fileName}>{fileName}</span>
                </label>
            </div>
            <Button variant="contained" component="span" onClick={submit}>
                Upload
            </Button>
        </form>
    );
}

const styles = {
    container: {
        display: 'flex',
        'flex-direction': 'column',
        marginBottom: '20px',
    },
    inputName: {
        width: '40%',
        marginRight: '30px',
        marginBottom: '20px',
    },
    fileName: {
        marginLeft: '15px',
    },
};
