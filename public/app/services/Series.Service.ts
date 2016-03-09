import { Injectable } from 'angular2/core';
import { Game } from './Game.Service';

export class Series {
	constructor(public id: number, public length: number, public homeUser: number, public awayUser: number) {
		
	}
	
	getOpponent(user: number) {
		if(this.homeUser == user) {
			return this.awayUser;
		} else {
			return this.homeUser;
		}
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
	// See the "Take it slow" appendix
	getSeriesSlowly() {
		return new Promise<Series[]>(resolve => setTimeout(()=>resolve(_mockSeries), 2000));
	}
	
	getSeries(id: number) {
		if(!!id) {
			return Promise.resolve(_mockSeries).then(
				series => series.filter(s => s.id === id)[0]
			);
		} else {
			return Promise.resolve(_mockSeries);
		}
	}
	
	getSeriesForUser(user: number) {
		return Promise.resolve(_mockSeries).then(
			series => series.filter(s => {
				return (s.homeUser === user || s.awayUser === user);
			})
		);
	}
}