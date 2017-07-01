import React from 'react';
import { Link } from 'dva/router';
import styles from './MainLayout.css';
import { Layout, Menu, Breadcrumb, Icon, Modal } from 'antd';
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

	checkAuth = (e) => {
		if (this.props.role < 201) {
			const failModal = Modal.error({
				title: '禁止访问',
				content: '没有访问用户管理的权限'
			});
			e.preventDefault();
		}
	}

	render() {
		return (
			<Layout>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo"><Icon type="appstore" />&nbsp;&nbsp;&nbsp;&nbsp;ZhangCui Movie Admin</div>
					<Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['3']}>
						 <Menu.Item key="3">
						 <Link to="/admin">
							<span>
								<Icon type="home" />
								<span className="nav-text">管理首页</span>
							</span>
							</Link>
						</Menu.Item>
						<SubMenu
							key="sub1"
							title={<span><Icon type="video-camera" /><span className="nav-text">电影管理</span></span>}
						>
							<Menu.Item key="1">
								<Link to="/admin/movie_add">添加电影</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/admin/movie_list">电影列表</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							title={<span><Icon type="tag-o" /><span className="nav-text">分类管理</span></span>}
						>
							<Menu.Item key="4">
								<Link to="/admin/category_add">添加分类</Link>
							</Menu.Item>
							<Menu.Item key="5">
								<Link to="/admin/category_list">分类列表</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub3"
							title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}
						>
							<Menu.Item key="6">
								<Link to="/admin/user_add" onClick={this.checkAuth}>添加用户</Link>
							</Menu.Item>
							<Menu.Item key="7">
								<Link to="/admin/user_list" onClick={this.checkAuth}>用户列表</Link>
							</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout>
					<Header userName={this.props.userName} handleLogout={this.props.handleLogout} />

					{this.props.children}
					
					<Footer style={{ textAlign: 'center' }}>
						Admin ©2016 &lt;/&gt; by ZhangCui
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default MainLayout;
