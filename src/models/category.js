import * as categoryService from '../services/category';

export default {
	namespace: 'category',
	state: {
		datas: [],
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
			const { data } = yield call(categoryService.fetch);

			yield put({ type: 'save', payload: { datas: data } });
		},
		*add({ payload: { _data } }, { call, put }) {
			const { data } = yield call(categoryService.add, { _data });

			yield put({ type: 'save', payload: { data } });
		},
		*clear({ payload }, { call, put }) {
			const data = [];
			yield put({ type: 'save', payload: { data }});
		},
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

};
