import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Table, Icon } from 'antd';
const { Content } = Layout;

class UserList extends React.Component {
	render() {
		const columns = [{
			title: '用户名',
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="#">{text}</a>,
		}, {
			title: '用户类型',
			dataIndex: 'role',
			key: 'role',
		}, {
			title: '昵称',
			dataIndex: 'nickname',
			key: 'nickname',
		}, {
			title: 'E-mail',
			dataIndex: 'email',
			key: 'email',
		}, {
			title: '地址',
			dataIndex: 'address',
			key: 'address',
		}, {
			title: '联系方式',
			dataIndex: 'telephone',
			key: 'telephone',
		}, {
			title: '注册时间',
			dataIndex: 'meta.createAt',
			key: 'createAt',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span>
					<a href="#">修改</a>
					<span className="ant-divider" />
					<a href="#">删除</a>
				</span>
			),
		}];

		return (
			<Content style={{ margin: '0 16px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
					<Breadcrumb.Item>用户列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<Table columns={columns} dataSource={this.props.data} loading={this.props.loading} />
				</div>
			</Content>
		);
	}
}

const mapStateToProps = (state) => {
	const { data } = state.userList;
	data.forEach(function(val, idx) {
		val.key = val._id;
	});
	return {
		data,
		loading: state.loading.models.userList
	}
};

export default connect(mapStateToProps)(UserList);
