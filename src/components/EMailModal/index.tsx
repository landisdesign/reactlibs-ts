import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers';
import { setShowEMail } from '../../reducers/ui/actions';

import Modal from '../../layouts/Modal';
import { ModalCloseEvent, ModalTransitionEvent } from '../../layouts/Modal/events';

import Text from '../../elements/Text';

type ReduxProps = ConnectedProps<typeof connector>;

const mapState = ({ui: {showEMail, transitionEMail}}: ReduxState) => ({
	showEMail,
	transitionEMail
});

const mapDispatch = {
	setShowEMail
};

class EmailModal extends React.Component<ReduxProps> {

	constructor(props: ReduxProps) {
		super(props);
		this.onBeforeClose = this.onBeforeClose.bind(this);
		this.onTransitionComplete = this.onTransitionComplete.bind(this);
	}

	onBeforeClose(e: ModalCloseEvent) {
		this.props.setShowEMail(false, true);
	}

	onTransitionComplete(e: ModalTransitionEvent) {
		this.props.setShowEMail(e.opening, false);
	}

	render() {
		const {
			showEMail,
			transitionEMail
		} = this.props;

		return (
			<Modal title='Send link to story' showCloseButton={true} isOpen={showEMail} isTransitioning={transitionEMail} onTransition={this.onTransitionComplete} onBeforeClose={this.onBeforeClose}>
				<Text type='story'>
					In real life this would generate a link to an e-mail address you&rsquo;d enter. This is just a demonstration of a grid-based modal.
				</Text>
			</Modal>
		);
	}

}

const connector = connect(mapState, mapDispatch);

export default connector(EmailModal);
