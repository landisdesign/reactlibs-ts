import { History } from 'history';
import { connect, ConnectedProps } from 'react-redux';

import { ReactlibThunkDispatch } from '../../reducers/types';

import { ReduxState } from '../../reducers/';
import { StoryConfigData, WordConfigData } from '../../reducers/config/types';
import { StoryConfig } from '../../reducers/config/state';

import { fetchConfig, startApplication } from '../../reducers/config/actions';
import { loadStories } from '../../reducers/stories/actions';
import { loadWords } from '../../reducers/words/actions';

import LandingView from './view';

export type ReduxProps = ConnectedProps<typeof connector>;

export interface ReceivedProps {
	path?: string;
	history: History;
}

const mapState = ({config}: ReduxState) => {
	const {
		loading,
		loaded,
		wordSources,
		storySource
	} = config;

	const configurationNeeded = !loaded && !loading;
	const landingVisible = !loaded;
	const configurationLoaded = loaded && loading;
	const readyToRedirect = loaded && !loading;
	/* We don't need these until all sources are loaded. Waiting until they are
	   all loaded lets us ignore the interim possibility of these being unfetched
	   ConfigSources instead specific data types. It also means we don't have to
	   do any type conversion in the view. */
	const wordConfigs: WordConfigData[] = (loaded ? wordSources : []) as WordConfigData[];
	const storyConfigs: StoryConfigData[] = (loaded ? (storySource as StoryConfig).stories : []) as StoryConfigData[];

	return {
		configurationNeeded,
		configurationLoaded,
		readyToRedirect,
		landingVisible,
		wordConfigs,
		storyConfigs,
		...config.getProgress()
	}
};

const mapDispatch = (dispatch: ReactlibThunkDispatch) => ({
	fetchConfig: (configUrl: string, minDelay: number) => dispatch(fetchConfig(configUrl, minDelay)),
	hydrateApplication: (storySources: StoryConfigData[], wordSources: WordConfigData[]) => {
		dispatch(loadStories(storySources));
		dispatch(loadWords(wordSources));
	},
	startApplication: () => dispatch(startApplication())
});

const connector = connect(mapState, mapDispatch);

export default connector(LandingView);