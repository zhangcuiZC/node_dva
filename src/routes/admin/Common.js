import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layouts/MainLayout';

class CheckLogin extends React.Component {
	componentDidMount = () => {
		if (!this.props.data.status) {
			this.props.dispatch({
				type: 'login/check'
			})
		}
	}

	handleLogout = (e) => {
		this.props.dispatch({
			type: 'login/logout'
		})
	}

	render() {
		return (
			<MainLayout userName={this.props.data.name || '验证登录信息...'} children={this.props.children} handleLogout={this.handleLogout} />
		);
	}
}
	

// 登录信息
const mapStateToProps = (state, ownProps) => {
	return {
		data: state.login.data
	};
}

export default connect(mapStateToProps)(CheckLogin);