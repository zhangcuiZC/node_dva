import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Common from './routes/admin/Common';
import AdminIndex from './routes/admin/Index';
import MovieAdd from "./routes/admin/MovieAdd.js";
import MovieList from "./routes/admin/MovieList.js";
import CategoryAdd from './routes/admin/CategoryAdd.js';
import CategoryList from "./routes/admin/CategoryList.js";
import UserAdd from "./routes/admin/UserAdd.js";
import UserList from './routes/admin/UserList';
import Login from './routes/admin/Login';

import Home from './routes/home/Index';

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Route path="/" component={Home} />
			<Route path="/admin" component={Common}>
				<IndexRoute component={AdminIndex} />
				<Route path="movie_add" component={MovieAdd} />
				<Route path="movie_list" component={MovieList} />
				<Route path="category_add" component={CategoryAdd} />
				<Route path="category_list" component={CategoryList} />
				<Route path="user_add" component={UserAdd} />
				<Route path="user_list" component={UserList} />
			</Route>
			<Route path="/admin/login" component={Login} />
		</Router>
	);
}

export default RouterConfig;
