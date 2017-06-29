import * as movieService from '../services/movie';

export default {
	namespace: 'movie',
	state: {
		data: []
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathname === '/admin/movie_list') {
					dispatch({ type: 'fetch' });
				}
			});
		},
	},

	effects: {
		*fetch({ payload }, { call, put }) {
			const {data} = yield call(movieService.fetch);

			yield put({ type: 'save', payload: { data } });
		},
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

};
