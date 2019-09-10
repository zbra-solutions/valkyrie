import React from 'react';
import Profile from '../components/Profile';
import DocumentList from '../components/DocumentList';
import DocumentForm from '../components/DocumentForm';
import { Redirect } from 'react-router';

export default function Main() {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString ? userString : 'null');

    return user ? (
        <>
            <Profile user={user} />
            <DocumentForm />
            <DocumentList />
        </>
    ) : (
        <Redirect to="/" />
    );
}
