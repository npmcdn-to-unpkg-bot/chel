import { Component, Input, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

import { Series, SeriesService } from '../services/Series.Service';
import { Game, GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { Team, TeamService } from '../services/Team.Service';
import { SeriesNumberService } from '../services/SeriesNumber.Service';

@Component({
	selector: 'series',
	templateUrl: 'app/Series/Series.Component.html',
	styleUrls: ['app/Series/Series.Component.css'],
	directives: [
		MDL
	]
})
export class SeriesComponent implements OnInit {
	@Input() series: Series;
	games: Game[] = [];
	loggedInUserId: string = '';
	isHome: boolean = false;
	isWinner: boolean = false;
	isLoser: boolean = false;
	seriesNumber: number = 1;
	opponentId: string = '';
	opponentName: string = '';
	homeUser: User = {};
	awayUser: User = {};
	homeGamesWon: number = 0;
	awayGamesWon: number = 0;
	isOver: boolean = false;
	isElimination: boolean = false;

	constructor(
		private _seriesService: SeriesService,
		private _gameService: GameService,
		private _userService: UserService,
		private _teamService: TeamService,
		private _seriesNumberService: SeriesNumberService,
		private _router: Router,
		private _routeParams: RouteParams) {

	}

	ngOnInit() {
		this.loggedInUserId = this._userService.getLastLoggedInUserId();
		this.opponentId = this.series.getOpponent(this.loggedInUserId);
		this._userService.getUser(this.loggedInUserId).subscribe(user => {
			if(this.series.homeUser === this.loggedInUserId) {
				this.homeUser = user;
				this.isHome = true;
			} else {
				this.awayUser = user;
			}
		});
		this._userService.getUser(this.opponentId).subscribe(user => {
			this.opponentName = user.name
			if(this.series.homeUser === this.opponentId) {
				this.homeUser = user;
			} else {
				this.awayUser = user;
			}
		});
		this._gameService.getGamesBySeries(this.series.id).subscribe(games => {
			this.games = games;
			this.games.forEach(game => {
				if(game.getWinner() === this.homeUser.id) {
					this.homeGamesWon = this.homeGamesWon + 1;
				} else {
					this.awayGamesWon = this.awayGamesWon + 1;
				}
			});
			let winsNeeded = this.series.getWinsNeeded();
			console.log('winsNeeded: ' + winsNeeded);
			console.log('homeWins: ' + this.homeGamesWon);
			console.log('awayWins: ' + this.awayGamesWon);
			if(this.homeGamesWon >= winsNeeded || this.awayGamesWon >= winsNeeded) {
				console.log('isOver');
				this.isOver = true;
				if(this.isHome) {
					if(this.homeGamesWon > this.awayGamesWon) {
						this.isWinner = true;
					} else {
						this.isLoser = true;
					}
				} else {
					if(this.awayGamesWon > this.homeGamesWon) {
						this.isWinner = true;
					} else {
						this.isLoser = true;
					}
				}
			} else if (this.homeGamesWon >= winsNeeded - 1 || this.awayGamesWon >= winsNeeded - 1) {
				console.log('isElimination');
				this.isElimination = true;
			}
		});
		/*this._seriesNumberService.getSeriesNumber(id, this.opponentId, this.series.id).then(number => {
			this.seriesNumber = number;	
		});*/
	}

	goToDetail() {
		let link = ['SeriesDetail', { id: this.series.id }];
		this._router.navigate(link);
	}
	
	startGame() {
		
	}
	
	editSeries() {
		
	}
	
	deleteSeries() {
		
	}
}