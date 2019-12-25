import React from 'react';

import styles from './Image.module.scss';

type AlignOptions = 'center';

interface ImageProps {
	src: string;
	align?: AlignOptions;
	alt?: string; 
}

export default class Image extends React.PureComponent<ImageProps> {

	render() {

		const {
			src,
			alt,
			align
		} = this.props;

		return <img className={align === 'center' ? styles.center : undefined} src={src} alt={alt} />;
	}

}
