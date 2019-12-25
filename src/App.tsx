import React from 'react';
import { Switch, Route, Redirect, RouteChildrenProps } from 'react-router-dom';

import Landing from './components/Landing';
import Application from './components/Application';

interface StoryParams {
	id?: string;
}

export default class App extends React.Component {
	render() {

		const defaultRender = ({match, history}: RouteChildrenProps<StoryParams>): React.ReactNode => <>
			<Landing path={match?.path} history={history}/>
			<Application id={match?.params.id}/>
		</>;

		return <Switch>
			<Route path={['/stories/:id']} render={defaultRender}/>
			<Route path={['/', '/stories']} exact={true} render={defaultRender}/>
			<Route><Redirect to='/'/></Route>
		</Switch>;
	}
}
