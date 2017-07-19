import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Table, Icon, Popconfirm, message } from 'antd';
const { Content } = Layout;

class UserList extends React.Component {
	handleConfirm = (_id) => {
		this.props.dispatch({
			type: 'user/delete',
			payload: {
				_data: _id,
				cb: this.deleteMsg
			}
		})
	}

	deleteMsg = (status) => {
		if (status === 1) {
			message.success('删除成功');
		}else {
			message.error('删除失败');
		}
	}

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
					<Popconfirm title="确认删除吗？" onConfirm={this.handleConfirm.bind(null, record._id)}>
						<a href="#">删除</a>
					</Popconfirm>
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
					<Table columns={columns} dataSource={this.props.datas} loading={this.props.loading} />
				</div>
			</Content>
		);
	}
}

const mapStateToProps = (state) => {
	const { datas } = state.user;
	datas.forEach(function(val, idx) {
		val.key = val._id;
	});
	return {
		datas,
		loading: state.loading.models.user
	}
};

export default connect(mapStateToProps)(UserList);
