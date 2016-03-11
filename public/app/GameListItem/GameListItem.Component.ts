import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import {MDL} from '../MaterialDesignLite.Directive';

import { Game, GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { Team, TeamService } from '../services/Team.Service';
import { Series, SeriesService } from '../services/Series.Service';

@Component({
	selector: 'game-list-item',
	templateUrl: 'app/GameListItem/GameListItem.Component.html',
	styleUrls: ['app/GameListItem/GameListItem.Component.css'],
	directives: [
		MDL
	]
})
export class GameListItemComponent implements OnInit {
	@Input() game: Game;
	homeUser: User = {};
	awayUser: User = {};
	homeTeam: Team = {};
	awayTeam: Team = {};

	constructor(
		private _gameService: GameService,
		private _userService: UserService,
		private _teamService: TeamService,
		private _routeParams: RouteParams) {

	}

	ngOnInit() {
		console.log(this.game);
		this._userService.getUser(this.game.homeUser).subscribe(user => this.homeUser = user);
		this._userService.getUser(this.game.awayUser).subscribe(user => this.awayUser = user);
		this._teamService.getTeam(this.game.homeTeam).then(team => this.homeTeam = team);
		this._teamService.getTeam(this.game.awayTeam).then(team => this.awayTeam = team);
	}

	gotoDetail() {
		/*let link = ['GameDetail', { id: game.id }];
		this._router.navigate(link);*/
	}
}