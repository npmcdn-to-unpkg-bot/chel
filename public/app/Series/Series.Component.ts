import { Component, Input, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

import { Series, SeriesService } from '../services/Series.Service';
import { Game, GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { Team, TeamService } from '../services/Team.Service';

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
	opponentId: number = -1;
	opponentName: string = "";
	/*homeUser: User = {};
	awayUser: User = {};
	homeTeam: Team = {};
	awayTeam: Team = {};*/

	constructor(
		private _seriesService: SeriesService,
		private _gameService: GameService,
		private _userService: UserService,
		private _teamService: TeamService,
		private _router: Router,
		private _routeParams: RouteParams) {

	}

	ngOnInit() {
		console.log('series component init');
		console.log(this.series);
		let id = this._userService.getLastLoggedInUserId();
		this.opponentId = this.series.getOpponent(id);
		this._userService.getUser(this.opponentId).then(user => this.opponentName = user.name);
		console.log("opponent id: " + this.opponentId);
		this._gameService.getGamesBySeries(this.series.id).then(games => {
			this.games = games;
			console.log("series " + this.series.id + " games:");
			console.log(this.games);
		});
		/*this._userService.getUser(this.game.homeUser).then(user => this.homeUser = user);
		this._userService.getUser(this.game.awayUser).then(user => this.awayUser = user);
		this._teamService.getTeam(this.game.homeTeam).then(team => this.homeTeam = team);
		this._teamService.getTeam(this.game.awayTeam).then(team => this.awayTeam = team);*/
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