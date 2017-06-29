import * as categoryService from '../services/category';

export default {
	namespace: 'category',
	state: {
		data: []
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathname === '/admin/category_list') {
					dispatch({ type: 'fetch' });
				}
			});
		},
	},

	effects: {
		*fetch({ payload }, { call, put }) {
			const {data} = yield call(categoryService.fetch);

			yield put({ type: 'save', payload: { data } });
		},
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

};
