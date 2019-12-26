import React from 'react';
import { Switch, Route, Redirect, RouteChildrenProps } from 'react-router-dom';

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
			<Route path={['/stories/:id']} render={this.appOutput}/>
			<Route path={['/', '/stories']} exact={true} render={this.appOutput}/>
			<Route><Redirect to='/'/></Route>
		</Switch>;
	}
}
