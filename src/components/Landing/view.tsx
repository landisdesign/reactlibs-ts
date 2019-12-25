import React from 'react';
import { Redirect } from 'react-router-dom';

import { shallowPropsChanged } from '../../common';

import { ReceivedProps, ReduxProps } from './index';

type LandingProps = ReduxProps & ReceivedProps;

const configUrl = '/development/madlibs/config/config.json';
const minimumSplashScreenDuration = 3000;

export default class LandingView extends React.Component<LandingProps> {

	shouldComponentUpdate(nextProps: LandingProps) {
		const shallowPropKeys = ['configurationNeeded', 'configurationLoaded', 'readyToRedirect', 'current', 'total', 'path']; // we won't care about the sources until current === total
		
		return shallowPropsChanged(this.props, nextProps, shallowPropKeys);
	}

	render() {
		const {
			configurationNeeded,
			configurationLoaded,
			readyToRedirect,
			landingVisible,
			current,
			total,
			wordConfigs,
			storyConfigs,
			path,

			fetchConfig,
			startApplication
		} = this.props;

		const redirect = readyToRedirect && (path === '/'); // Fade is complete. Redirect if on the home page.

		if (configurationNeeded) {
			fetchConfig(configUrl, minimumSplashScreenDuration);
		}

		if (configurationLoaded) {
			startApplication(storyConfigs, wordConfigs, 600);
		}


		return redirect ? (
			<Redirect to='/stories'/>
		) : (
			`Modal open=${landingVisible} fade=${configurationLoaded} background='#FFF' close=${false}`+
				`Image src='/development/madlibs/logo.png' align='center'/`+
				`Title'MadLibs, React style'/Title`+
				`ProgressIndicator current=${current} max=${total} width='80%' backgroundColor='#DEF' /`+
				`Copyright/`+
			`/Modal`
		);
	}
}