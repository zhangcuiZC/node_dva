import React from 'react';

import styles from './MainLayout.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import Header from './Header';

class MainLayout extends React.Component {
	state = {
		collapsed: false,
		mode: 'inline',
	};
	onCollapse = (collapsed) => {
		this.setState({
			collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		});
	}
	render() {
		return (
			<Layout>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo"></div>
					<Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
						<SubMenu
							key="sub1"
							title={<span><Icon type="video-camera" /><span className="nav-text">电影管理</span></span>}
						>
							<Menu.Item key="1">添加电影</Menu.Item>
							<Menu.Item key="2">电影列表</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							title={<span><Icon type="tag-o" /><span className="nav-text">分类管理</span></span>}
						>
							<Menu.Item key="4">添加分类</Menu.Item>
							<Menu.Item key="5">分类列表</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub3"
							title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}
						>
							<Menu.Item key="6">添加用户</Menu.Item>
							<Menu.Item key="7">用户列表</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout>
					<Header userName={this.props.userName} />
					{this.props.children}
					<Footer style={{ textAlign: 'center' }}>
						Zhangcui ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default MainLayout;
