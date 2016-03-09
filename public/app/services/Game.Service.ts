import { Injectable } from 'angular2/core';

export interface Game {
	id: number;
	series: number;
	date: string;
	homeUser: number;
	awayUser: number;
	homeTeam: number;
	awayTeam: number;
	homeScore: number;
	awayScore: number;
	overtime: boolean;
	notes: string;
}

export class GameUtilities {
	/*(countHomeWins(series: Series, games: Game[]) : number {
		//games.filter(game => game.)
		return 0;
	}
	isSeriesOver(series: Series, games: Game[]) : boolean {
		//let homeWins = 
		return false;
	}*/
}

function randomDate(){
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
];

@Injectable()
export class GameService {
	getGames() {
		return Promise.resolve(_mockGames);
	}

	getGame(id: number) {
		return Promise.resolve(_mockGames).then(games => games.filter(game => game.id === id)[0]);
	}
	
	getGamesBySeries(series: number) {
		return Promise.resolve(_mockGames).then(games => games.filter(game => game.series === series));
	}
}