import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';
import { setShowEMail } from '../../reducers/ui/actions';

import { ButtonProps } from '../../elements/Button';
import Text from '../../elements/Text';
import FormLayout from '../../layouts/FormLayout';

const mapState = ({ui}: ReduxState) => ({
	story: ui.output
});

const mapDispatch = (dispatch: Dispatch) => ({
	showEMailModal: () => dispatch(setShowEMail(true, true))
});

type ReduxProps = ConnectedProps<typeof connector>;

class StoryPanel extends React.PureComponent<ReduxProps> {

	private buttons: ButtonProps[];

	constructor(props: ReduxProps) {
		super(props);
		this.openDialog = this.openDialog.bind(this);
		this.buttons = [
			{
				content: 'E-mail to a friend',
				onClick: this.openDialog
			}
		];
	}

	private openDialog() {
		this.props.showEMailModal();
	}

	render() {
		return this.props.story ? (
			<FormLayout scrolling={true} buttons={this.buttons}>
				<Text type='story' html={this.props.story}/>
			</FormLayout>
		) : null;
	}
}

const connector = connect(mapState, mapDispatch);

export default connector(StoryPanel);