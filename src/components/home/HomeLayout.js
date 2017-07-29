import React from 'react';
import styles from './HomeLayout.css';
import LeftBar from './LeftBar';
import Content from './Content';

class HomeLayout extends React.Component {
	render() {
		return (
			<div className={styles.main}>
				<LeftBar />
				<Content />
			</div>
		);
	}
}

export default HomeLayout;