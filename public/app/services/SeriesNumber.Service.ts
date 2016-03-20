import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import { Series, SeriesService } from './Series.Service';
import { Game, GameService } from './Game.Service';

@Injectable()
export class SeriesNumberService {
	constructor(private http: Http,
				private _seriesService: SeriesService,
				private _gameService: GameService) {}
	
	getSeriesNumber(me: string, opponent: string, series: string) {
		var ss = [];
		this._seriesService.getSeriesAgainstOpponent(me, opponent).subscribe(s => {
			ss = s;
		});
		return 1
	}
}