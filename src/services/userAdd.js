import request from '../utils/request';

export async function fetch({ _data }) {
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