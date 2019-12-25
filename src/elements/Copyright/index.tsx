import React from 'react';

import styles from './Copyright.module.scss';

export default class Copyright extends React.PureComponent {
	
	render() {
		return (
			<div className={styles.copyright}>
				Copyright &copy;{ ( new Date() ).getFullYear() } Michael Landis
			</div>
		);
	}

}
