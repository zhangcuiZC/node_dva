import * as loginService from '../services/login';
import { routerRedux } from 'dva/router';

export default {
	namespace: 'login',
	state: {
		data: []
	},

	effects: {
		*fetch({ payload: { _data } }, { call, put }) {
			const { data } = yield call(loginService.fetch, { _data });
			yield put({ type: 'save', payload: { data } });
			if (data.status === 1) {
				yield put(routerRedux.push('/admin'));
			}
		},
		*check({ payload }, { call, put }) {
			const { data } = yield call(loginService.check);
			if (data.status === 1) {
				yield put({ type: 'save', payload: { data } });
			}else {
				yield put(routerRedux.push('/admin/login'));
			}
		},
		*logout({ payload }, { call, put }) {
			const { data } = yield call(loginService.logout);
			if (data.status === 1) {
				yield put({ type: 'save', payload: { data: [] }});
				yield put(routerRedux.push('/admin/login'));
			}
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
	}

};
