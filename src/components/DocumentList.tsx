import React, { ChangeEvent, Component } from 'react';
import { db } from '../firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
import Comments from '../pages/Comments';
import { Link } from 'react-router-dom';

type State = {
    documents: any[];
    expanded: string | false;
};

export default class DocumentList2 extends Component<{}, State> {
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
                console.log(u);
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

    addComment = () => {

    }

    render() {
        return (
            <ul>
                {this.state &&
                    this.state.documents.map((doc: any, index: number) => {
                        const divisor = index > 0 ? styles.divisor : {};

                        return (
                            <li
                                key={String(index)}
                                style={{
                                    ...styles.document,
                                    ...divisor,
                                }}
                            >
                                <span style={styles.name}>{doc.name}</span>
                                <Link
                                    to={{
                                        pathname: '/comments',
                                        state: {
                                            document: doc,
                                        },
                                    }}
                                    style={styles.comments}
                                >
                                    {doc.comments ? doc.comments.length : 0}{' '}
                                    comments
                                </Link>
                                <a href={doc.link}>Download document</a>
                            </li>
                        );
                    })}
            </ul>
        );
    }
}

const styles = {
    document: {
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: '20px 0px',
    },
    divisor: {
        borderTop: '1px solid #eee',
    },
    name: {
        fontSize: '16px',
        'font-weight': 'bold',
    },
    comments: {
        fontSize: '12px',
        color: '#aaa',
    },
};
