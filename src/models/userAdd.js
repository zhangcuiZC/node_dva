import * as userAddService from '../services/userAdd';

export default {
	namespace: 'userAdd',
	state: {
		data: []
	},

	effects: {
		*fetch({ payload: { _data } }, { call, put }) {
			const { data } = yield call(userAddService.fetch, { _data });

			yield put({ type: 'save', payload: { data } });
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
