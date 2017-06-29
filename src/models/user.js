import * as userService from '../services/user';

export default {
	namespace: 'user',
	state: {
		data: [],
		check: [],
		datas: []
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathname === '/admin/user_list') {
					dispatch({ type: 'fetch' });
				}
			});
		},
	},

	effects: {
		*fetch({ payload }, { call, put }) {
			const { data } = yield call(userService.fetch);
			yield put({ type: 'save', payload: { datas: data } });
		},

		*add({ payload: { _data } }, { call, put }) {
			const { data } = yield call(userService.add, { _data });
			yield put({ type: 'save', payload: { data } });
		},

		*check({ payload: { _data } }, { call, put }) {
			const { data } = yield call(userService.check, { _data });
			yield put({ type: 'save', payload: { check: data } });
		},
		
		*clear({ payload }, { call, put }) {
			const data = [];
			yield put({ type: 'save', payload: { data }});
		}
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

};
