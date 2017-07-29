import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Form, Input, Icon, Button, Modal } from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;

class CategoryAdd extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.dispatch({
					type: 'category/add',
					payload: {
						_data: values,
						cb: this.addCategoryMsg
					}
				})
			}
		});
	}

	addCategoryMsg = (status) => {
		const _this = this;
		if (status === 1) {
			const successModal = Modal.success({
				title: '添加成功！',
				content: '新分类已成功添加',
				onOk() {
					_this.props.form.resetFields();
				}
			});
		}else {
			const failModal = Modal.error({
				title: '添加失败！',
				content: '新建分类失败'
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
					<Breadcrumb.Item>分类管理</Breadcrumb.Item>
					<Breadcrumb.Item>添加分类</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 44, background: '#fff', minHeight: 360 }}>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
							{...formItemLayout}
							label="分类名称"
							hasFeedback
						>
							{getFieldDecorator('category_name', {
								rules: [{ required: true, message: '分类名称不可为空!', whitespace: true }],
							})(
								<Input placeholder="请输入分类名称" />
							)}
						</FormItem>

						<FormItem {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit" icon="save">添加分类</Button>
						</FormItem>
					</Form>
				</div>
			</Content>
		);
	}
}
const WrappedCategoryAdd = Form.create()(CategoryAdd);
const mapStateToProps = (state, ownProps) => {
	return {
		data: state.category.data,
	}
};

export default connect(mapStateToProps)(WrappedCategoryAdd);
