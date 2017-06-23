import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
import { Form, Input, Icon, Select, Button, Radio, Upload, message, Tooltip, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class UserAdd extends React.Component {
	state = {
		categoryStyle: '1',
		posterStyle: '1'
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.dispatch({
					type: 'userAdd/fetch',
					payload: { _data: values } 
				});

			}
		});
	}

	signUpSuccess = () => {
		const _this = this;
		const successModal = Modal.success({
			title: '添加成功！',
			content: '用户已成功添加',
			onOk() {
				_this.props.form.resetFields();
			}
		});
	}
	signUpFail = () => {
		const failModal = Modal.error({
			title: '添加失败！',
			content: '用户名已被使用'
		});
	}

	componentDidUpdate = () => {
		if (this.props.data.status === 1) {
			this.signUpSuccess();
			this.props.dispatch({
				type: 'userAdd/clear'
			});
		}else if (this.props.data.status === 0) {
			this.signUpFail();
			this.props.dispatch({
				type: 'userAdd/clear'
			});
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
  			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 4,
				},
			},
		};

		return (
			<Content style={{ margin: '0 16px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
					<Breadcrumb.Item>添加用户</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 44, background: '#fff', minHeight: 360 }}>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
							{...formItemLayout}
							label="用户名"
							hasFeedback
						>
							{getFieldDecorator('name', {
								rules: [{ required: true, message: '用户名不可为空!', whitespace: true }],
							})(
								<Input placeholder="请输入用户名" />
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="密码"
							hasFeedback
						>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '密码不可为空!', whitespace: true }],
							})(
								<Input placeholder="请输入密码" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="昵称"
							hasFeedback
						>
							{getFieldDecorator('nickname', {
								rules: [{ required: true, message: '昵称不可为空!', whitespace: true }],
							})(
								<Input placeholder="请输入昵称" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label={(
								<span>
									用户类型&nbsp;
									<Tooltip title="普通用户拥有评论电影的权限；管理员拥有登录后台管理系统及对电影和分类的操作权限；超级管理员拥有对用户的操作权限。">
										<Icon type="question-circle-o" />
									</Tooltip>
								</span>
							)}
						>
							{getFieldDecorator('role', {
								initialValue: '1'
							})(
								<Select>
									<Option value="1">普通用户</Option>
									<Option value="101">管理员</Option>
									<Option value="201">超级管理员</Option>
								</Select>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="E-mail"
							hasFeedback
						>
							{getFieldDecorator('email', {
								rules: [{ required: false }, {
									type: 'email', message: '请输入有效的E-mail地址'
								}],
							})(
								<Input placeholder="请输入E-mail" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="联系方式"
							hasFeedback
						>
							{getFieldDecorator('telephone', {
								rules: [{ required: false }],
							})(
								<Input placeholder="请输入联系电话" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="地址"
							hasFeedback
						>
							{getFieldDecorator('address', {
								rules: [{ required: false }],
							})(
								<Input placeholder="请输入地址" />
							)}
						</FormItem>
						
						<FormItem {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit" icon="save">添加用户</Button>
						</FormItem>
					</Form>
				</div>
			</Content>
		);
	}
}
const WrappedUserAdd = Form.create()(UserAdd);

const mapStateToProps = (state, ownProps) => {
	return {
		data: state.userAdd.data,
		// loading: state.loading.models.userAdd
	}
};

export default connect(mapStateToProps)(WrappedUserAdd);