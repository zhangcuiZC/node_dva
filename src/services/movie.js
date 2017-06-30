import request from '../utils/request';

export async function fetch() {
  return request('http://localhost:3000/admin/list');
}

export async function add({ _data }) {
	return request('http://localhost:3000/admin/movie', {
		method:'POST', 
		headers: { 
			'Content-Type': 'application/json' 
		}, 
		body: JSON.stringify(_data) 
	});
}