import request from '../utils/request';

export async function fetch() {
  return request('http://localhost:3000/category/list');
}

export async function add({ _data }) {
	return request('http://localhost:3000/category/add', {
		method:'POST', 
		headers: { 
			'Content-Type': 'application/json' 
		}, 
		body: JSON.stringify(_data) 
	});
}

export async function del({ _data }) {
	return request(`http://localhost:3000/category/list/${_data}`, {
		method:'DELETE',
	});
}