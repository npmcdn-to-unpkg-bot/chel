import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

import { Game, GameService } from '../services/Game.Service';

import { GameListItemComponent } from '../GameListItem/GameListItem.Component';

@Component({
	selector: 'game-list',
	templateUrl: 'app/GameList/GameList.Component.html',
	styleUrls: ['app/GameList/GameList.Component.css'],
	directives: [CORE_DIRECTIVES,
  				GameListItemComponent]
})
export class GameListComponent implements OnInit {
	games: Game[] = [];

	constructor(
		private _router: Router,
		private _gameService: GameService) {
	}

	ngOnInit() {
		this._gameService.getGames().then(games => {
			this.games = games;
		});
	}
}