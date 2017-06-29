import request from '../utils/request';

export async function add({ _data }) {
	return request('http://localhost:3000/user/signup', {
		method:'POST', 
		headers: { 
			'Content-Type': 'application/json' 
		}, 
		body: JSON.stringify(_data) 
	});
}

export async function check({ _data }) {
	return request('http://localhost:3000/user/validate', {
		method:'POST', 
		headers: { 
			'Content-Type': 'application/json' 
		}, 
		body: JSON.stringify(_data) 
	});
}

export async function fetch() {
	return request('http://localhost:3000/admin/userlist');
}