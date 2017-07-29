import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb, Form, Input, Icon, Select, Button, Radio, Upload, message, Modal } from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const Dragger = Upload.Dragger;

class MovieAdd extends React.Component {
	// 初始状态，控制分类和海报的类型
	state = {
		categoryStyle: '1',
		posterStyle: '1',
		hasShowMsg: '0'
	}

	// 提交信息
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.dispatch({
					type: 'movie/add',
					payload: {
						_data: values,
						cb: this.addMovieMsg
					}
				})
			}
		});
	}

	// douban
	handleSearch = (value) => {
		this.props.dispatch({
			type: 'movie/fetchDouban',
			payload: { _data: value }
		});
	}

	// 改变分类类型的回调
	handleCategoryStyle = (e) => {
		this.setState({ categoryStyle: e.target.value });
	}
	// 改变海报类型的回调
	handlePosterStyle = (e) => {
		this.setState({ posterStyle: e.target.value });
	}

	// 提示Modal
	addMovieMsg = (data) => {
		const _this = this;
		if (data.status === 1) {
			const successModal = Modal.success({
				title: '添加成功！',
				content: data.msg,
				onOk() {
					_this.props.form.resetFields();
				}
			});
		}else {
			const failModal = Modal.error({
				title: '添加失败！',
				content: data.msg
			});
		}
	}

	componentDidUpdate = () => {
		if (this.props.doubanData.title && this.state.hasShowMsg === '0') {
			message.success('获取豆瓣电影数据成功！');
			this.setState({
				hasShowMsg: '1'
			});
		}
	}

	componentWillUnmount = () => {
		this.props.dispatch({
			type: 'movie/clearDouban'
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { categoryStyle, posterStyle } = this.state;
		const { category, doubanData } = this.props;

		let categoryInput, posterInput;

		if (categoryStyle === '1') {
			categoryInput = (
				getFieldDecorator('category', {
				})(
					<Select
						showSearch
						placeholder="搜索并选择分类"
						optionFilterProp="children"
						filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						{ category.map((item) => {
							return (
								<Option key={item._id} value={item._id}>{item.name}</Option>
							);
						}) }
					</Select>
				)
			);
		}else {
			categoryInput = (
				getFieldDecorator('newCategory', {
				})(
					<Input  placeholder="请输入自定义类名" />
				)
			);
		}

		const props = {
			name: 'file',
			multiple: false,
			showUploadList: true,
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
				<div style={{ height: 60, marginBottom: 20 }}>
					<Dragger {...props}>
						
						<p className="ant-upload-hint">点击或者拖动图片文件到此区域进行上传</p>
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
						{getFieldDecorator('prev_category', {})(
							<Input type="hidden" />
						)}
						<FormItem
							{...formItemLayout}
							label="通过豆瓣ID获取"
							hasFeedback
						>
							<Search
								placeholder="请输入豆瓣电影ID"
								style={{ width: '100%' }}
								onSearch={value => this.handleSearch(value)}
							/>
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影名称"
							hasFeedback
						>
							{getFieldDecorator('title', {
								rules: [{ required: true, message: '电影名称不可为空!', whitespace: true }],
								initialValue: `${doubanData.title || ''}`
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

							{ categoryInput }
							
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影导演"
							hasFeedback
						>
							{getFieldDecorator('director', {
								rules: [{ required: false }],
								initialValue: `${(doubanData.directors && doubanData.directors[0].name) || ''}`
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
								initialValue: `${(doubanData.countries && doubanData.countries.join('/')) || ''}`
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
								initialValue: `${doubanData.year || ''}`
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
								rules: [{ required: true, message: '海报地址不可为空!' }],
								initialValue: `${(doubanData.images && doubanData.images.large) || ''}`
							})(posterInput)}

						</FormItem>
						<FormItem
							{...formItemLayout}
							label="电影简介"
							hasFeedback
						>
							{getFieldDecorator('summary', {
								rules: [{ required: false }],
								initialValue: `${doubanData.summary || ''}`
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

const mapStateToProps = (state, ownProps) => {
	return {
		category: state.category.datas,
		data: state.movie.data,
		doubanData: state.movie.doubanData
	}
}

export default connect(mapStateToProps)(WrappedMovieAdd);
