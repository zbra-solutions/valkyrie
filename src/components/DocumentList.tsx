import React from 'react';
import { db } from '../firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
import { TextField, Button, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                {this.state.documents.map((doc: any) => {
                    return (
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{doc.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {doc.name}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </>
        )
    };
}