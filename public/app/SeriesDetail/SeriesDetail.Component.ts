import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteParams } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

import { Series, SeriesService } from '../services/Series.Service';
import { Game, GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';

import { SeriesDetailGameComponent } from '../SeriesDetailGame/SeriesDetailGame.Component';

@Component({
	selector: 'series-detail',
	templateUrl: 'app/SeriesDetail/SeriesDetail.Component.html',
	styleUrls: ['app/SeriesDetail/SeriesDetail.Component.css'],
	directives: [
		MDL,
		CORE_DIRECTIVES,
		SeriesDetailGameComponent
	]
})
export class SeriesDetailComponent implements OnInit {
	series: Series = {};
	games: Game[] = [];
	seriesOver: boolean = true;

	constructor(
		private _seriesService: SeriesService,
		private _gameService: GameService,
		private _routeParams: RouteParams) {
			this.id = _routeParams.get('id');
	}

	ngOnInit() {
		this._seriesService.getSeriesById(this.id).subscribe(series => {
			this.series = series;
			this._gameService.getGamesBySeries(this.id).subscribe(games => {
				this.games = games;
				this.games.sort((a,b) => return (new Date(b.date) - new Date(a.date)));
				
				this.seriesOver = this.games.length >= this.series.length;
			});
		});
	}
}