import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';
import { setShowEMail } from '../../reducers/ui/actions';

/**
	const button = [
		{
			content: 'E-mail to a friend',
			disabled: !story,
			onClick: openDialog
		}
	];
}
*/

const mapState = ({ui}: ReduxState) => ({
	story: ui.output
});

const mapDispatch = (dispatch: Dispatch) => ({
	showEMailModal: () => dispatch(setShowEMail(true, true))
});

type ReduxProps = ConnectedProps<typeof connector>;

class StoryPanel extends React.PureComponent<ReduxProps> {

	button: string = 'button';

	openDialog() {
		this.props.showEMailModal();
	}

	render() {
		return /*this.props.story ?*/ (<>
			FormLayout scrolling={true} buttons={this.button}
				Text type='story' html={this.props.story}/
			/FormLayout
		</>) //: null;
	}
}

const connector = connect(mapState, mapDispatch);

export default connector(StoryPanel);