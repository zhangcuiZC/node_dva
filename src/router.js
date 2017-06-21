import React from 'react';
import { Router, Route } from 'dva/router';
import adminIndex from './routes/admin/index';

import MovieAdd from "./routes/admin/movieAdd.js";

function RouterConfig({ history }) {
	return (
        <Router history={history}>
            <Route path="/admin" component={adminIndex} />
            <Route path="/admin/movie_add" component={MovieAdd} />
        </Router>
    );
}

export default RouterConfig;
