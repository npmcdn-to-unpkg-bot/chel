import { Component, Input, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

import { Game, GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { Team, TeamService } from '../services/Team.Service';

@Component({
	selector: 'series-detail-game',
	templateUrl: 'app/SeriesDetailGame/SeriesDetailGame.Component.html',
	styleUrls: ['app/SeriesDetailGame/SeriesDetailGame.Component.css'],
	directives: [
		MDL,
		CORE_DIRECTIVES
	]
})
export class SeriesDetailGameComponent implements OnInit {
	public @Input() index: number;
	public @Input() game: Game;
	loggedInUserId: string = '';
	public homeUser: User = {};
	public awayUser: User = {};
	public homeTeam: Team = {};
	public awayTeam: Team = {};

	constructor(
		private _gameService: GameService,
		private _userService: UserService,
		private _teamService: TeamService,
		private _router: Router,
		private _routeParams: RouteParams) {

	}

	ngOnInit() {
		console.log(this.index);
		console.log(this.game);
		this.loggedInUserId = this._userService.getLastLoggedInUserId();
		this._userService.getUser(this.game.homeUser).subscribe(user => this.homeUser = user);
		this._userService.getUser(this.game.awayUser).subscribe(user => this.awayUser = user);
		this._teamService.getTeam(this.game.homeTeam).subscribe(team => this.homeTeam = team);
		this._teamService.getTeam(this.game.awayTeam).subscribe(team => this.awayTeam = team);
	}
	
	isCurrentUser(id: string) {
		return id === this.loggedInUserId;
	}
	
	formatDate(dateString: string): string {
		var monthNames = [
			"Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov", "Dec"
		];

		var date = new Date();
			var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		
		return monthNames[monthIndex] + ' ' + day + ', ' + year;
	}
	
	editGame() {
		
	}
	
	deleteGame() {
		
	}
}