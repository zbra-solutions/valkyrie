import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Comments from './pages/Comments';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/documents" exact component={Main} />
                <Route path="/comments" exact component={Comments} />
            </Switch>
        </BrowserRouter>
    );
}
