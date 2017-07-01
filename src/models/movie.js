import * as movieService from '../services/movie';

export default {
	namespace: 'movie',
	state: {
		datas: [],
		data: [],
		doubanData: []
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathname === '/admin/movie_list') {
					dispatch({ type: 'fetch' });
				}
				if (pathname === '/admin/movie_add') {
					dispatch({ type: 'category/fetch' });
				}
			});
		},
	},

	effects: {
		*fetch({ payload }, { call, put }) {
			const {data} = yield call(movieService.fetch);

			yield put({ type: 'save', payload: { datas: data } });
		},

		*add({ payload: { _data } }, { call, put }) {
			const { data } = yield call(movieService.add, { _data });
			yield put({ type: 'save', payload: { data } });
		},

		*fetchDouban({ payload: { _data } }, { call, put }) {
			const { data } = yield call(movieService.fetchDouban, { _data });
			yield put({ type: 'save', payload: { doubanData: data } });
		},

		*clear({ payload }, { call, put }) {
			const data = [];
			yield put({ type: 'save', payload: { data }});
		},

		*clearDouban({ payload }, { call, put }) {
			const doubanData = [];
			yield put({ type: 'save', payload: { doubanData }});
		},

		*delete({ payload: { _data, cb } }, { call, put }) {
			const { data } = yield call(movieService.del, { _data });
			cb(data.status);
			yield put({
				type: 'fetch'
			})			
		},
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

};
