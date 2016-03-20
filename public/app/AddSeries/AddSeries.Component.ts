import { Component, OnInit } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

@Component({
	selector: 'add-series',
	templateUrl: 'app/AddSeries/AddSeries.Component.html',
	styleUrls: ['app/AddSeries/AddSeries.Component.css'],
	directives: [
		MDL,
		FORM_DIRECTIVES
	]
})
export class AddSeriesComponent implements OnInit {
	constructor(
		private _router: Router) {
	}

	ngOnInit() {
		/*this._seriesService.getSeries().then(series => {
			this.series = series;
			console.log("1 " + this.series);
		});*/
	}
	
	save() {
		//show loading animation
		//send request
		//on response navigate to newly created series
		//this._router.navigate(['SeriesDetail', { id: this.series.id }]);
	}
}