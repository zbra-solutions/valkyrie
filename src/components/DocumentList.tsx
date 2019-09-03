import React, { useState, ChangeEvent } from 'react';
import { db } from '../firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
import { storage, storageRef } from '../firebase';
import { TextField, Input, Button } from '@material-ui/core';

export default function DocumentList() {
    const collection = db.collection('documents');
    const query = collection.orderBy('name');
    const documents = collectionData(query, 'id').pipe(startWith([]));

    const [name, setName] = useState("");
    const [fileList, setFileList] = useState();
    const [selectedDoc, setSelectedDoc] = useState();

    async function submit() {
        if (fileList) {
            const url = await upload();
            collection.add({ name: name, link: url });
        }
    }

    function upload() {
        return storageRef.child(fileList[0].name).put(fileList[0])
            .then(snapshot => snapshot.ref.getDownloadURL())
            .catch((error) => console.log(error));
    }

    function remove(doc: any) {
        collection.doc(doc.id).delete();
        const commentsQuery = db.collection('comments').where('documentId', '==', doc.id);
        const results: any = collectionData(commentsQuery, 'id').pipe();
        results.subscribe((r: any) => {
            r.forEach((result: any) => {
                db.collection('comments').doc(result.id).delete();
            });
        });
        const fileReference = storage.refFromURL(doc.link);
        fileReference.delete();
        if (selectedDoc && selectedDoc.id == doc.id) {
            setSelectedDoc(null);
        }
    }

    const onNameChange = (event: any) => {
        setName(event.target.value);
    }

    return(
        <>
            <TextField label="Name" value={name} onChange={onNameChange}/>
            <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" type="file"/>
            <label htmlFor="raised-button-file">
                <Button component="span">
                    Upload
                </Button>
            </label>
        </>
    );
}