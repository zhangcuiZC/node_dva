import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.dispatch({
					type: 'login/fetch',
					payload: { _data: values } 
				});
			}
		});
	}

	loginFail = (msg) => {
		const failModal = Modal.error({
			title: '登录失败',
			content: msg
		});
	}

	componentDidUpdate = () => {
		if (this.props.data.status === 0) {
			this.loginFail(this.props.data.msg);
			this.props.dispatch({
				type: 'login/clear'
			});
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<h1 style={{fontWeight: 'lighter', textAlign: 'center', paddingTop: '20vh'}}>ZhangCui电影后台管理系统</h1>
				<h2 style={{fontWeight: 'lighter', color: '#108ee9', textAlign: 'center', marginTop: '20px'}}>登&nbsp;&nbsp;&nbsp;&nbsp;录</h2>
				<Form onSubmit={this.handleSubmit} style={{maxWidth: '300px', margin: '20px auto'}}>
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: '请输入用户名!' }],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住我</Checkbox>
						)}
						<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码？</a>
						<Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
							登录
						</Button>
						或者 <a href="">现在注册！</a>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const WrappedLoginForm = Form.create()(LoginForm);

const mapStateToProps = (state, ownProps) => {
	return {
		data: state.login.data,
	}
};

export default connect(mapStateToProps)(WrappedLoginForm);