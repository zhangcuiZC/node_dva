import React from 'react';
import styles from './Content.css';
import MovieInfo from './MovieInfo';

class Content extends React.Component {
	render() {
		return (
			<div className={styles.content}>
				<div className="co_item" style={{'backgroundImage':'url(images/poster4.jpg)'}}>
					<MovieInfo />
				</div>
				<div className="co_item" style={{'backgroundImage':'url(images/poster3.jpg)'}}>
					<MovieInfo />
				</div>
				<div className="co_item" style={{'backgroundImage':'url(images/poster2.jpg)'}}>
					<MovieInfo />
				</div>
				<div className="co_item" style={{'backgroundImage':'url(images/poster1.jpg)'}}>
					<MovieInfo />
				</div>
			</div>
		);
	}
}

export default Content;

// <i className={styles.layer}>
// 					<i className={styles.layer_i} style={{'backgroundImage':'url(images/poster4.jpg)'}} />
// 				</i>