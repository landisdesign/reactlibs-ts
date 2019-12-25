import React from 'react';
import { Redirect } from 'react-router-dom';

import { ReceivedProps, ReduxProps } from './index';

import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import Modal from '../../layouts/Modal';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

type LandingProps = ReduxProps & ReceivedProps;

const configUrl = '/development/madlibs/config/config.json';
const minimumSplashScreenDuration = 3000;

export default class LandingView extends React.Component<LandingProps> {

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
			<Modal isOpen={landingVisible} willTransition={configurationLoaded} background={{backgroundColor: '#FFF'}} showCloseButton={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={current} max={total} width='80%' backgroundColor='#DEF'/>
				<Copyright/>
			</Modal>
		);
	}
}