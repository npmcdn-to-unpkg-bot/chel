import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

import { Series, SeriesService } from '../services/Series.Service';
import { UserService } from '../services/User.Service';

import { SeriesComponent } from '../Series/Series.Component';

@Component({
	selector: 'series-list',
	templateUrl: 'app/SeriesList/SeriesList.Component.html',
	styleUrls: ['app/SeriesList/SeriesList.Component.css'],
	directives: [CORE_DIRECTIVES,
  				SeriesComponent]
})
export class SeriesListComponent implements OnInit {
	series: Series[] = [];
	loggedInUserId: string;

	constructor(
		private _router: Router,
		private _seriesService: SeriesService,
		private _userService: UserService) {
	}

	ngOnInit() {
		this.loggedInUserId = this._userService.getLastLoggedInUserId();
		this._seriesService.getSeriesForUser(this.loggedInUserId).subscribe(series => {
			this.series = series;
		});
	}
	
	addSeries() {
		this._router.navigate(['AddSeries', {}]);
		//document.querySelector('.chel-drawer').classList.remove("is-visible");
		//document.querySelector('.mdl-layout__obfuscator').classList.remove("is-visible");
	}
}