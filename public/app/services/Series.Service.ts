import { Injectable } from 'angular2/core';
import { Game } from './Game.Service';

import { Http } from 'angular2/http';

export class Series {
	constructor(public id: string, public length: number, public homeUser: string, public awayUser: string) {

	}
	
	getOpponent(user: string) {
		if(this.homeUser == user) {
			return this.awayUser;
		} else {
			return this.homeUser;
		}
	}
	
	getWinsNeeded() {
		return Math.floor(this.length / 2) + 1;
	}
}

/*export class SeriesUtilities {
	countHomeWins(series: Series, games: Game[]) : number {
		//games.filter(game => game.)
		return 0;
	}
	isSeriesOver(series: Series, games: Game[]) : boolean {
		//let homeWins = 
		return false;
	}
}*/

var _mockSeries: Series[] = [];
_mockSeries.push(new Series(0, 3, 0, 1));
_mockSeries.push(new Series(1, 3, 1, 0));
_mockSeries.push(new Series(2, 3, 0, 1));
_mockSeries.push(new Series(3, 3, 2, 1));


@Injectable()
export class SeriesService {
	private _uri: string = '/api/series/';
	
	constructor(private http: Http) {};
	
	getSeriesById(id: string) {
		return this.http.get(this._uri + id).map( responseData => {
			let d = responseData.json();
			return new Series(d._id, d.length, d.homeUser, d.awayUser);
		});
	}
	
	getSeries() {
		return this.http.get(this._uri).map( responseData => {
			return responseData.json();
		})
		.map((series: Array<any>) => {
			let result:Array<Series> = [];
			if (series) {
				series.forEach((s) => {
					result.push(new Series(
						s._id,
						s.length,
						s.homeUser,
						s.awayUser));
				});
			}
			return result;
		});
	}
	
	getSeriesForUser(user: string) {
		return this.http.get(this._uri).map( responseData => {
			return responseData.json();
		})
		.map((series: Array<any>) => {
			let result:Array<Series> = [];
			if (series) {
				series.forEach((s) => {
					if(s.homeUser === user || s.awayUser === user) {
						result.push(new Series(
							s._id,
							s.length,
							s.homeUser,
							s.awayUser));
					}
				});
			}
			return result;
		});
	}
	
	getSeriesAgainstOpponent(me: string, opponent: string) {
		return this.http.get(this._uri).map( responseData => {
			return responseData.json();
		})
		.map((series: Array<any>) => {
			let result:Array<Series> = [];
			if (series) {
				series.forEach((s) => {
					if((s.homeUser === me || s.awayUser === me) && (s.homeUser === opponent || s.awayUser === opponent)) {
						result.push(new Series(
							s._id,
							s.length,
							s.homeUser,
							s.awayUser));
					}
				});
			}
			return result;
		});
	}
}