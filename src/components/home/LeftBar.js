import React from 'react';
import styles from './LeftBar.css';
import { Icon, Input, Menu, Form, Button } from 'antd';

const Search = Input.Search;
const FormItem = Form.Item;

class LeftBar extends React.Component {
	state = {
		hide: false
	}

	hideLeftBar() {
		this.setState({
			hide: !this.state.hide
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const isHide = this.state.hide ? 'leftBarHide' : '';
		return (
			<div className={`${styles.leftbar} ${isHide}`}>
				<div className={styles.code}>
					<Icon type="github" style={{fontSize: 16, color: '#333'}} />
					<span className={styles.arrow} onClick={this.hideLeftBar.bind(this)}><Icon type="arrow-left" style={{fontSize: 16, color: '#333'}} /></span>
				</div>
				<div className={styles.title}>
					张璀电影社区
					<div className={styles.vice_title}>
						电影交流评论社区
					</div>
				</div>
				<div className={styles.search}>
					<Search
						placeholder="查找电影"
						style={{ width: '100%' }}
						onSearch={value => console.log(value)}
					/>
				</div>
				<div className={styles.category}>
					<div className="c_item active">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
					<div className="c_item">
						<span className={styles.ci_name}>分类名称</span>
						<span className={styles.ci_num}>99</span>
					</div>
				</div>
				<div className={styles.user}>
					<div className={styles.u_title}>
						<span style={{float: 'left'}}>欢迎，请登录</span>
						<a href="" style={{float: 'right'}}>注册</a>
					</div>
					<Form onSubmit={this.handleSubmit}>
						<FormItem style={{marginBottom: '12px'}}>
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
						<Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
							登录
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
const LeftBarWrapped = Form.create()(LeftBar);
export default LeftBarWrapped;