import request from '../utils/request';

export async function fetch() {
  return request('http://localhost:3000/admin/catelist');
}

export async function add({ _data }) {
	return request('http://localhost:3000/admin/category', {
		method:'POST', 
		headers: { 
			'Content-Type': 'application/json' 
		}, 
		body: JSON.stringify(_data) 
	});
}
