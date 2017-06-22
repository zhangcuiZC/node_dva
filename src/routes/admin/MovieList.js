import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Table, Icon } from 'antd';
const { Content } = Layout;

class MovieList extends React.Component {
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
					<a href="#">删除</a>
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
					<Table columns={columns} dataSource={this.props.data} loading={this.props.loading} />
				</div>
			</Content>
		);
	}
}

const mapStateToProps = (state) => {
	const { data } = state.movieList;
	data.forEach(function(val, idx) {
		val.key = val._id;
	});
	return {
		data,
		loading: state.loading.models.movieList
	}
};

export default connect(mapStateToProps)(MovieList);
