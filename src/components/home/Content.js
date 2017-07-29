import React from 'react';
import styles from './Content.css';

class Content extends React.Component {
	render() {
		return (
			<div className={styles.content}>
				<div className="co_item" style={{'backgroundImage':'url(images/poster4.jpg)'}}>

				</div>
				<div className="co_item" style={{'backgroundImage':'url(images/poster3.jpg)'}}>

				</div>
				<div className="co_item" style={{'backgroundImage':'url(images/poster2.jpg)'}}>

				</div>
				<div className="co_item" style={{'backgroundImage':'url(images/poster1.jpg)'}}>

				</div>
				<i className={styles.layer}>
					<i className={styles.layer_i} style={{'backgroundImage':'url(images/poster4.jpg)'}} />
				</i>
			</div>
		);
	}
}

export default Content;