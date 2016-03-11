import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

@Component({
	selector: 'settings',
	templateUrl: 'app/Settings/Settings.Component.html',
	styleUrls: ['app/Settings/Settings.Component.css'],
	directives: [
		MDL,
		CORE_DIRECTIVES
	]
})
export class SettingsComponent implements OnInit {
	constructor(
		private _router: Router) {
	}

	ngOnInit() {
		/*this._seriesService.getSeries().then(series => {
			this.series = series;
			console.log("1 " + this.series);
		});*/
	}
}