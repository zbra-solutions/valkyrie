import React from 'react';
import { db } from '../firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
import { TextField, Button, Typography } from '@material-ui/core';

export default class DocumentList extends React.Component {
    collection: firebase.firestore.CollectionReference;
    query: any;

    state = {
        documents: [],
    };

    constructor(props: any) {
        super(props);

        this.collection = db.collection('documents');
        this.query = this.collection.orderBy('name');
    }

    componentDidMount() {
        collectionData(this.query, 'id').pipe(startWith([])).subscribe((u: any) => {
            this.setState({
                documents: u,
            });
        });
    }

    render() {
        return (
            <>
                <TextField label="Name"/>
                <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" type="file"/>
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                <ul>
                    {this.state.documents.map((doc: any) => {
                        return (
                            <>
                                <li>
                                    <Typography variant="subtitle1" gutterBottom>{doc.name}</Typography>
                                </li>
                            </>
                        );
                    })}
                </ul>
            </>
        )
    };
}