import request from '../utils/request';

export async function fetch() {
	return request('http://localhost:3000/admin/userlist');
}