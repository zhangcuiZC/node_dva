import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
import { Form, Input, Icon, Select, Button, Radio, Upload, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const Dragger = Upload.Dragger;

class MovieAdd extends React.Component {
	state = {
		categoryStyle: '1',
		posterStyle: '1'
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	handleCategoryStyle = (e) => {
		this.setState({ categoryStyle: e.target.value });
	}
	handlePosterStyle = (e) => {
		this.setState({ posterStyle: e.target.value });
	}



	render() {
		const { getFieldDecorator } = this.props.form;
		const { categoryStyle, posterStyle } = this.state;

		let categoryInput, posterInput;

		if (categoryStyle === '1') {
			categoryInput = (
				<Select
					showSearch
					placeholder="搜索并选择分类"
					optionFilterProp="children"
					filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				>
					<Option value="1">科幻</Option>
					<Option value="2">惊悚</Option>
					<Option value="3">剧情</Option>
				</Select>
			);
		}else {
			categoryInput = (
				<Input  placeholder="请输入自定义类名" />
			);
		}

		const props = {
			name: 'file',
			multiple: false,
			showUploadList: false,
			action: '/',
			onChange(info) {
				const status = info.file.status;
				if (status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (status === 'done') {
					message.success(`${info.file.name} 文件上传成功.`);
				} else if (status === 'error') {
					message.error(`${info.file.name} 文件上传失败.`);
				}
			},
		};
		if (posterStyle === '1') {
			posterInput = (
				<Input placeholder="请输入海报网址" />
			);
		}else {
			posterInput = (
				<div style={{ height: 120 }}>
					<Dragger {...props}>
						<p className="ant-upload-drag-icon">
							<Icon type="inbox" />
						</p>
						<p className="ant-upload-text">点击或者拖动图片文件到此区域进行上传</p>
					</Dragger>
				</div>
			);
		}

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
					<Breadcrumb.Item>电影管理</Breadcrumb.Item>
					<Breadcrumb.Item>添加电影</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 44, background: '#fff', minHeight: 360 }}>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
							{...formItemLayout}
							label="通过豆瓣ID获取"
							hasFeedback
						>
							<Search
								placeholder="请输入豆瓣电影ID"
								style={{ width: '100%' }}
								onSearch={value => console.log(value)}
							/>
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影名称"
							hasFeedback
						>
							{getFieldDecorator('title', {
								rules: [{ required: true, message: '电影名称不可为空!', whitespace: true }],
							})(
								<Input placeholder="请输入电影名称" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影分类"
						>
							<Radio.Group onChange={this.handleCategoryStyle} size="large" style={{ marginBottom: 10 }} value={ categoryStyle }>
								<Radio.Button value="1">选择分类</Radio.Button>
								<Radio.Button value="2">自定分类</Radio.Button>
							</Radio.Group>

							{getFieldDecorator('category', {
								rules: [{ required: true, message: '电影分类不可为空!' }],
							})(categoryInput)}
							
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影导演"
							hasFeedback
						>
							{getFieldDecorator('director', {
								rules: [{ required: false }],
							})(
								<Input placeholder="请输入导演信息" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="国家"
							hasFeedback
						>
							{getFieldDecorator('country', {
								rules: [{ required: false }],
							})(
								<Input placeholder="请输入国家信息" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="语言"
							hasFeedback
						>
							{getFieldDecorator('language', {
								rules: [{ required: false }],
							})(
								<Input placeholder="请输入语言信息" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="上映年代"
							hasFeedback
						>
							{getFieldDecorator('year', {
								rules: [{ required: false }],
							})(
								<Input placeholder="请输入上映年代" />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="海报地址"
						>
							<Radio.Group onChange={this.handlePosterStyle} size="large" style={{ marginBottom: 10 }} value={ posterStyle }>
								<Radio.Button value="1">海报网址</Radio.Button>
								<Radio.Button value="2">本地上传</Radio.Button>
							</Radio.Group>

							{getFieldDecorator('poster', {
								rules: [{ required: true, message: '海报地址不可为空!' }]
							})(posterInput)}

						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影简介"
							hasFeedback
						>
							{getFieldDecorator('year', {
								rules: [{ required: false }],
							})(
								<Input type="textarea" placeholder="请输入电影简介" autosize={{ minRows: 2, maxRows: 6 }} />
							)}
						</FormItem>

						<FormItem {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit" icon="save">录入</Button>
						</FormItem>
					</Form>
				</div>
			</Content>
		);
	}
}
const WrappedMovieAdd = Form.create()(MovieAdd);
export default connect()(WrappedMovieAdd);
