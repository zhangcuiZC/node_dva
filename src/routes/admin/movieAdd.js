import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layouts/MainLayout';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

class Main extends React.Component {
	render() {
		return (
			<MainLayout userName="张璀">
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '12px 0' }}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
						<h2>欢迎~</h2>
						<br/>
						<p>添加电影</p>
					</div>
				</Content>
			</MainLayout>
		);
	}
}

export default connect()(Main);
