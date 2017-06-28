import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

class Index extends React.Component {
	render() {
		return (
			<Content style={{ margin: '0 16px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<h2>欢迎~</h2>
					<br/>
					<p>点击左侧菜单进行管理</p>
				</div>
			</Content>
		);
	}
}
export default connect()(Index);
