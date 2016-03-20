import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

export class Game {
	constructor(
		public id: string,
		public series: string,
		public date: string,
		public homeUser: string,
		public awayUser: string,
		public homeTeam: string,
		public awayTeam: string,
		public homeScore: number,
		public awayScore: number,
		public overtime: boolean,
		public notes: string) {}
		
	getOpponent(user: string) {
		if(this.homeUser == user) {
			return this.awayUser;
		} else {
			return this.homeUser;
		}
	}
	
	getWinner(): string {
		if(this.homeScore > this.awayScore) {
			return this.homeUser;
		} else {
			return this.awayUser;
		}
	}
	
	isWinner(me: string) {
		return this.getWinner() === me;
	}
		
	getFormattedDate(){
		var d = new Date(this.date);
		var month = d.getMonth();
		var day = d.getDate();

		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		return String(d.getFullYear()) + month + day;
	}
}

export class GameUtilities {
	getFormattedDate(game){
		var month = date.getMonth();
		var day = date.getDate();

		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		return String(date.getFullYear()) + month + day;
	}
	/*countHomeWins(series: Series, games: Game[]) : number {
		//games.filter(game => game.)
		return 0;
	}
	isSeriesOver(series: Series, games: Game[]) : boolean {
		//let homeWins = 
		return false;
	}*/
}

/*function randomDate(){
   var startDate = new Date(2012,0,1).getTime();
   var endDate =  new Date(2015,0,1).getTime();
   var spaces = (endDate - startDate);
   var timestamp = Math.round(Math.random() * spaces);
   timestamp += startDate;
   return new Date(timestamp);
}

function formatDate(date){
    var month = randomDate().getMonth();
    var day = randomDate().getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return String(date.getFullYear()) + month + day;
}

var _mockGames: Game[] = [
	{
		"id": 0,
		"series": 0,
		"date": randomDate(),
		"homeUser": 1,
		"awayUser": 0,
		"homeTeam": 0,
		"awayTeam": 1,
		"homeScore": 1,
		"awayScore": 2,
		"overtime": false,
		"notes": ""
	},
	{
		"id": 1,
		"series": 0,
		"date": randomDate(),
		"homeUser": 0,
		"awayUser": 1,
		"homeTeam": 13,
		"awayTeam": 22,
		"homeScore": 5,
		"awayScore": 2,
		"overtime": true,
		"notes": ""
	},
	{
		"id": 2,
		"series": 0,
		"date": randomDate(),
		"homeUser": 1,
		"awayUser": 0,
		"homeTeam": 0,
		"awayTeam": 1,
		"homeScore": 1,
		"awayScore": 2,
		"overtime": false,
		"notes": ""
	},
	{
		"id": 3,
		"series": 1,
		"date": randomDate(),
		"homeUser": 0,
		"awayUser": 1,
		"homeTeam": 13,
		"awayTeam": 22,
		"homeScore": 5,
		"awayScore": 2,
		"overtime": true,
		"notes": ""
	},
	{
		"id": 4,
		"series": 1,
		"date": randomDate(),
		"homeUser": 1,
		"awayUser": 0,
		"homeTeam": 0,
		"awayTeam": 1,
		"homeScore": 1,
		"awayScore": 2,
		"overtime": false,
		"notes": ""
	},
	{
		"id": 5,
		"series": 1,
		"date": randomDate(),
		"homeUser": 0,
		"awayUser": 1,
		"homeTeam": 13,
		"awayTeam": 22,
		"homeScore": 5,
		"awayScore": 2,
		"overtime": true,
		"notes": ""
	},
	{
		"id": 6,
		"series": 2,
		"date": randomDate(),
		"homeUser": 1,
		"awayUser": 0,
		"homeTeam": 0,
		"awayTeam": 1,
		"homeScore": 1,
		"awayScore": 2,
		"overtime": false,
		"notes": ""
	},
	{
		"id": 7,
		"series": 2,
		"date": randomDate(),
		"homeUser": 0,
		"awayUser": 1,
		"homeTeam": 13,
		"awayTeam": 22,
		"homeScore": 5,
		"awayScore": 2,
		"overtime": true,
		"notes": ""
	}
];*/

@Injectable()
export class GameService {
	private _uri: string = '/api/games/';
	
	constructor(private http: Http) {}
	
	getGames() {
		//return Promise.resolve(_mockGames);
		
		return this.http.get(this._uri).map( responseData => {
			return responseData.json();
		})
		.map((games: Array<any>) => {
			let result:Array<Game> = [];
			if (games) {
				games.forEach((game) => {
					result.push(new Game(
						game._id,
						game.series,
						game.date,
						game.homeUser,
						game.awayUser,
						game.homeTeam,
						game.awayTeam,
						game.homeScore,
						game.awayScore,
						game.overtime,
						game.notes
					));
				});
			}
			return result;
		});
	}

	getGame(id: string) {
		//return Promise.resolve(_mockGames).then(games => games.filter(game => game.id === id)[0]);
		
		return this.http.get(this._uri + id).map( responseData => {
			let d = responseData.json();
			//console.log(d.date);
			//console.log(d._id);
			return new Game(
				d._id,
				d.series,
				d.date,
				d.homeUser,
				d.awayUser,
				d.homeTeam,
				d.awayTeam,
				d.homeScore,
				d.awayScore,
				d.overtime,
				d.notes
			);
		});
	}
	
	getGamesBySeries(series: string) {
		//console.log('getGamesBySeries');
		
		return this.http.get(this._uri).map( responseData => {
			//console.log(responseData.json());
			return responseData.json();
		})
		.map((games: Array<any>) => {
			let result:Array<Game> = [];
			if (games) {
				games.forEach((game) => {
					if(game.series === series) {
						result.push(new Game(
							game._id,
							game.series,
							game.date,
							game.homeUser,
							game.awayUser,
							game.homeTeam,
							game.awayTeam,
							game.homeScore,
							game.awayScore,
							game.overtime,
							game.notes
						));
					}
				});
			}
			return result;
		});
	}
}