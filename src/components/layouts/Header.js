import React from 'react';
import { Link } from 'dva/router';
import styles from './Header.css';
import { Layout, Avatar } from 'antd';
const { Header } = Layout;

class AdminHeader extends React.Component {

	render() {
		return (
			<Header className={styles.header}>
				<div className={styles.title}>
					<Link to="/admin">ZhangCui电影后台管理系统</Link>
				</div>
				<div className={styles.user}>
					<Avatar className={styles.avatar}>{this.props.userName.slice(0,1).toUpperCase()}</Avatar>
					<span>欢迎您，{this.props.userName} <span className="ant-divider" /> <Link onClick={this.props.handleLogout}>退出</Link></span>
				</div>
			</Header>
		);
	}
}

export default AdminHeader;
