import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

import { Series, SeriesService } from '../services/Series.Service';
import { Game, GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { Team, TeamService } from '../services/Team.Service';

@Component({
	selector: 'series-detail',
	templateUrl: 'app/SeriesDetail/SeriesDetail.Component.html',
	styleUrls: ['app/SeriesDetail/SeriesDetail.Component.css'],
	directives: [
		MDL
	]
})
export class SeriesDetailComponent implements OnInit {
	series: Series[] = [];
	games: Game[] = [];
	/*homeUser: User = {};
	awayUser: User = {};
	homeTeam: Team = {};
	awayTeam: Team = {};*/

	constructor(
		private _seriesService: SeriesService,
		private _gameService: GameService,
		private _userService: UserService,
		private _teamService: TeamService,
		private _routeParams: RouteParams) {

	}

	ngOnInit() {
		let id = +this._routeParams.get('id');
		this._seriesService.getSeries(id).subscribe(series => {
			this.series = series;
			console.log(this.series);
		});
		/*this._userService.getUser(this.game.homeUser).then(user => this.homeUser = user);
		this._userService.getUser(this.game.awayUser).then(user => this.awayUser = user);
		this._teamService.getTeam(this.game.homeTeam).then(team => this.homeTeam = team);
		this._teamService.getTeam(this.game.awayTeam).then(team => this.awayTeam = team);*/
	}

	gotoDetail() {
		/*let link = ['GameDetail', { id: game.id }];
		this._router.navigate(link);*/
	}
}