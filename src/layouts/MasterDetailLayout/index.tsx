import React from 'react';

import { BaseEvent, buildClasses } from '../../common';

import styles from './MasterDetailLayout.module.scss';

export type MasterDetailPanelIdentifier = 'master' | 'detail';

export const BEFORE_PANEL_CHANGE_EVENT_TYPE: string = 'beforePanelChange';

export class BeforePanelChangeEvent extends BaseEvent {
	readonly panelName: MasterDetailPanelIdentifier;

	constructor(target: HTMLElement | null, trusted: boolean, panelName: MasterDetailPanelIdentifier) {
		super(BEFORE_PANEL_CHANGE_EVENT_TYPE, false, target, trusted);
		this.panelName = panelName;
	}
}

class PanelClasses {

	readonly master: string;
	readonly detail: string;

	constructor(baseClass: string, currentPanel: MasterDetailPanelIdentifier) {
		let classNames = {
			master: [baseClass],
			detail: [baseClass]
		};
		classNames[currentPanel].push('current');

		const buildClassesFromStyles = buildClasses(styles);
		this.master = buildClassesFromStyles(classNames.master);
		this.detail = buildClassesFromStyles(classNames.detail);
	}
}

interface MasterDetailLayoutProps {
	detailContent: React.ReactNode;
	detailLabel: React.ReactNode;
	masterContent: React.ReactNode;
	masterLabel: React.ReactNode;
	onBeforeChangePanel?: (e: BeforePanelChangeEvent) => void;
	currentPanel: MasterDetailPanelIdentifier;
}

interface MasterDetailLayoutState {
	currentPanel: MasterDetailPanelIdentifier;
}

export default class MasterDetailLayout extends React.Component<MasterDetailLayoutProps, MasterDetailLayoutState> {

	constructor(props: MasterDetailLayoutProps) {
		super(props);
		this.changeHighlight = this.changeHighlight.bind(this);
		this.state = {
			currentPanel: props.currentPanel
		}
	}

	changeHighlight(clickEvent: React.MouseEvent<HTMLLIElement>) {
		const target = clickEvent.currentTarget;
		const panelName = target.dataset.panelName as MasterDetailPanelIdentifier;
		if (panelName !== this.state.currentPanel) {
			const e = new BeforePanelChangeEvent(target, true, panelName);
			if (this.props.onBeforeChangePanel) {
				this.props.onBeforeChangePanel(e);
			}
			if (!e.defaultPrevented) {
				this.setState({
					currentPanel: panelName
				});
			}
		}
	}

	render() {

		const {
			masterLabel,
			masterContent,
			detailLabel,
			detailContent
		} = this.props;

		const tabClasses = new PanelClasses('tab', this.state.currentPanel);
		const panelClasses = new PanelClasses('panel', this.state.currentPanel);

		return <div className={styles.container}>
			<div className={styles.tabHolder}>
				<ul className={styles.tabs}>
					<li className={tabClasses.master} data-panel-name='master' onClick={this.changeHighlight}>{masterLabel}</li>
					<li className={tabClasses.detail} data-panel-name='detail' onClick={this.changeHighlight}>{detailLabel}</li>
				</ul>
			</div>
			<div className={styles.panelHolder}>
				<div className={panelClasses.master}>
					{masterContent}
				</div>
				<div className={panelClasses.detail}>
					{detailContent}
				</div>
			</div>
		</div>;
	}
}