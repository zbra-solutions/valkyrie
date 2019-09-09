import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/documents" exact component={Main} />
        </Switch>
    );
}
