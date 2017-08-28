import React from 'react';
import styles from './MovieInfo.css';

class MovieInfo extends React.Component {
	render() {
		return (
			<div className={styles.infoBox}>
				<p className={styles.title}>秒速5厘米</p>
				<p className={styles.director}>新海诚 作品</p>
				<p className={styles.summary}>简介</p>
			</div>
		);
	}
}

export default MovieInfo;