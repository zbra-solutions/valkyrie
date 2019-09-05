import React, { ChangeEvent, Component } from 'react';
import { db } from '../firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Link,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type State = {
    documents: any[];
    expanded: string | false;
};

export default class DocumentList extends Component<{}, State> {
    collection: firebase.firestore.CollectionReference;
    query: any;

    constructor(props: any) {
        super(props);

        this.collection = db.collection('documents');
        this.query = this.collection.orderBy('name');
    }

    componentDidMount() {
        collectionData(this.query, 'id')
            .pipe(startWith([]))
            .subscribe((u: any) => {
                this.setState({
                    documents: u,
                });
            });
    }

    handleChange = (panel: string) => {
        return (event: ChangeEvent<{}>, isExpanded: boolean) => {
            const expandedPanel = isExpanded ? panel : false;
            this.setState({
                expanded: expandedPanel,
            });
        };
    };

    render() {
        return (
            <>
                {this.state &&
                    this.state.documents.map((doc: any, index: number) => {
                        const panelId = `panel${index}`;
                        return (
                            <ExpansionPanel
                                expanded={this.state.expanded === panelId}
                                onChange={this.handleChange(panelId)}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>{doc.name}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        <Link href={doc.link}>
                                            Download file
                                        </Link>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        );
                    })}
            </>
        );
    }
}
