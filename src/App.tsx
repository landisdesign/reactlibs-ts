import React from 'react';
import { Switch, Route, Redirect, RouteChildrenProps } from 'react-router-dom';

import { APP_PREFIX } from './common';

import Landing from './components/Landing';
import Application from './components/Application';

interface StoryParams {
	id?: string;
}

export default class App extends React.Component {

	private appOutput({match, history}: RouteChildrenProps<StoryParams>) {
		return <>
			<Landing path={match?.path} history={history}/>
			<Application id={match?.params.id} history={history}/>
		</>;
	}

	render() {

		return <Switch>
			<Route path={[APP_PREFIX + ':id']} render={this.appOutput}/>
			<Route path={['/', APP_PREFIX]} exact={true} render={this.appOutput}/>
			<Route><Redirect to='/'/></Route>
		</Switch>;
	}
}
