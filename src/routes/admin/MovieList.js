import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Table, Icon, Popconfirm, message } from 'antd';
const { Content } = Layout;

class MovieList extends React.Component {

	handleConfirm = (_id) => {
		this.props.dispatch({
			type: 'movie/delete',
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
			title: '电影名称',
			dataIndex: 'title',
			key: 'title',
			render: text => <a href="#">{text}</a>,
		}, {
			title: '导演',
			dataIndex: 'director',
			key: 'director',
		}, {
			title: '国家',
			dataIndex: 'country',
			key: 'country',
		}, {
			title: '上映年份',
			dataIndex: 'year',
			key: 'year',
		}, {
			title: '录入时间',
			dataIndex: 'meta.createAt',
			key: 'createAt',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span>
					<a href={`http://localhost:3000/movie/${record._id}`} target="_blank" >查看</a>
					<span className="ant-divider" />
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
					<Breadcrumb.Item>电影管理</Breadcrumb.Item>
					<Breadcrumb.Item>电影列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<Table columns={columns} dataSource={this.props.datas} loading={this.props.loading} />
				</div>
			</Content>
		);
	}
}

const mapStateToProps = (state) => {
	const { datas } = state.movie;
	datas.forEach(function(val, idx) {
		val.key = val._id;
	});
	return {
		datas,
		loading: state.loading.models.movie
	}
};

export default connect(mapStateToProps)(MovieList);
