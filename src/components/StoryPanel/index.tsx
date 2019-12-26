import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';
import { setShowEMail } from '../../reducers/ui/actions';

/**
 *	Presents the story when created, along with a button open the demo e-mail dialog.
 *
function StoryPanel() {

	function openDialog() {
		dispatch(setShowEMail(true, true));
	}

	const dispatch = useDispatch();
	const story = useSelector(({ui: {output}}) => output);

	const button = [
		{
			content: 'E-mail to a friend',
			disabled: !story,
			onClick: openDialog
		}
	];

	return story ? (
		<FormLayout scrolling={true} buttons={button}>
			<Text type='story' html={story}/>
		</FormLayout>
	) : null;
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