import request from '../utils/request';

export async function fetch({ _data }) {
	return request('http://localhost:3000/user/signin', {
		method:'POST', 
		headers: { 
			'Content-Type': 'application/json' 
		}, 
		credentials: 'include',
		body: JSON.stringify(_data) 
	});
}

export async function check() {
	return request('http://localhost:3000/user/check', {
		credentials: 'include'
	});
}

export async function logout() {
	return request('http://localhost:3000/user/logout', {
		credentials: 'include'
	});
}