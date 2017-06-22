import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Common from './routes/admin/Common';
import AdminIndex from './routes/admin/Index';
import MovieAdd from "./routes/admin/MovieAdd.js";
import MovieList from "./routes/admin/MovieList.js";
import CategoryAdd from './routes/admin/CategoryAdd.js';
import CategoryList from "./routes/admin/CategoryList.js";

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Route path="/admin" component={Common}>
				<IndexRoute component={AdminIndex} />
				<Route path="/admin/movie_add" component={MovieAdd} />
				<Route path="/admin/movie_list" component={MovieList} />
				<Route path="/admin/category_add" component={CategoryAdd} />
				<Route path="/admin/category_list" component={CategoryList} />
			</Route>
		</Router>
	);
}

export default RouterConfig;
