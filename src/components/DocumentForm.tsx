import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import { storageRef } from '../firebase';
import { db } from '../firebase';

export default function DocumentForm() {
  let [name, setName] = useState();
  let [document, setDocument] = useState();
  let [fileName, setFileName] = useState();

  const collection = db.collection('documents');

  function onChangeFileHandler(event: any) {
    setDocument(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  async function submit() {
    if (document) {
      console.log('entrou');
      const link = await upload();
      console.log('executou o upload');
      collection.add({ name, link });
    }
  }

  async function upload() {
    return storageRef
      .child(document.name)
      .put(document)
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .catch((error: any) => console.log(error));
  }

  async function onChangeName(event: any) {
    setName(event.target.value);
  }

  return (
    <div>
      <TextField label="Name" onChange={onChangeName} />
      <input
        accept=".pdf,image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={onChangeFileHandler}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Escolha o documento
        </Button>
        {fileName}
      </label>
      <Button variant="contained" component="span" onClick={submit}>
        Upload
      </Button>
    </div>
  );
}
