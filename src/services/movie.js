import request from '../utils/request';
import fetchJsonp from 'fetch-jsonp';

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

export async function fetchDouban({ _data }) {
	const url = `http://api.douban.com/v2/movie/subject/${_data}`;
	return fetchJsonp(url)
		.then(res => res.json())
		.then(data => ({ data }))
		.catch(err => ({ err }));
}