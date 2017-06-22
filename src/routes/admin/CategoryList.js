import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Table, Icon } from 'antd';
const { Content } = Layout;

class CategoryList extends React.Component {
	render() {
		const columns = [{
			title: '分类名称',
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="#">{text}</a>,
		}, {
			title: '电影数量',
			dataIndex: 'movies',
			key: 'movies',
		}, {
			title: '录入时间',
			dataIndex: 'meta.createAt',
			key: 'createAt',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span>
					<a href="#" target="_blank" >查看</a>
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
					<Breadcrumb.Item>分类管理</Breadcrumb.Item>
					<Breadcrumb.Item>分类列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<Table columns={columns} dataSource={this.props.data} loading={this.props.loading} />
				</div>
			</Content>
		);
	}
}

const mapStateToProps = (state) => {
	const { data } = state.categoryList;
	data.forEach(function(val, idx) {
		val.key = val._id;
	});
	return {
		data,
		loading: state.loading.models.categoryList
	}
};

export default connect(mapStateToProps)(CategoryList);
