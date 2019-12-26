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

	componentDidMount() {

		const {
			configurationNeeded,

			fetchConfig
		} = this.props;

		if (configurationNeeded) {
			fetchConfig(configUrl, minimumSplashScreenDuration);
		}
	}

	componentDidUpdate(prevProps: LandingProps) {

		const {
			configurationLoaded,
			storyConfigs,
			wordConfigs,

			hydrateApplication
		} = this.props;

		if (configurationLoaded && !prevProps.configurationLoaded) {
			hydrateApplication(storyConfigs, wordConfigs);
		}
	}

	render() {
		const {
			configurationLoaded,
			isTransitioning,
			readyToRedirect,
			landingVisible,
			current,
			total,
			path,

			startApplication
		} = this.props;

		const redirect = readyToRedirect && (path === '/'); // Fade is complete. Redirect if on the home page.
		const transitionListener = configurationLoaded ? () => startApplication() : undefined;

		return redirect ? (
			<Redirect to='/stories'/>
		) : (
			<Modal isOpen={landingVisible} isTransitioning={isTransitioning} onTransition={transitionListener} onBeforeClose={e => e.preventDefault()} background={{backgroundColor: '#FFF'}} showCloseButton={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={current} max={total} width='80%' backgroundColor='#DEF'/>
				<Copyright/>
			</Modal>
		);
	}
}