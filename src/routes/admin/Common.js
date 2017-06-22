import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layouts/MainLayout';

// 登录信息
const mapStateToProps = (state, ownProps) => {
	return {
		userName: '张璀'
	};
}

export default connect(mapStateToProps)(MainLayout);