import { Component, provide, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

import {MDL} from '../MaterialDesignLite.Directive';

import { StorageService } from '../services/Storage.Service';
import { GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { TeamService } from '../services/Team.Service';
import { SeriesService } from '../services/Series.Service';

import { SeriesListComponent } from '../SeriesList/SeriesList.Component';
import { SeriesDetailComponent } from '../SeriesDetail/SeriesDetail.Component';
import { GameListComponent } from '../GameList/GameList.Component';
import { SettingsComponent } from '../Settings/Settings.Component';

@Component({
	selector: 'chel-app',
	templateUrl: 'app/App/App.Component.html',
	styleUrls: ['app/App/App.Component.css'],
	directives: [
		CORE_DIRECTIVES,
		ROUTER_DIRECTIVES,
		MDL
	],
	providers: [
		ROUTER_PROVIDERS,
		StorageService,
		GameService,
		UserService,
		TeamService,
		SeriesService,
		provide(LocationStrategy, {useClass: HashLocationStrategy})
	]
})
@RouteConfig([
	{
		path: '/series',
		name: 'SeriesList',
		component: SeriesListComponent,
		useAsDefault: true
	},
	{
		path: '/series/:id',
		name: 'SeriesDetail',
		component: SeriesDetailComponent
	},
	{
		path: '/games',
		name: 'GameList',
		component: GameListComponent
	},
	{
		path: '/settings',
		name: 'Settings',
		component: SettingsComponent
	}
])
export class AppComponent implements OnInit{
	title = "Chel";
	users: User[] = [];
	loggedInUserId: number = -1;
	loggedInUserName: string = ""; 
	
	constructor(
		public router: Router,
		private _userService: UserService) {
	}
	
	ngOnInit() {
		this._userService.getUsers().then(users => {
			this.users = users;
			this.loggedInUserId = this._userService.getLastLoggedInUserId();
			this.loggedInUserName = this.users.filter(user => user.id == this.loggedInUserId)[0].name;
		});
	}
	
	addUser() {
		console.log('adding user...');
	}
	
	setUser(id: number) {
		this.loggedInUserId = id;
		this.loggedInUserName = this.users.filter(user => user.id == id)[0].name;
		setTimeout(function() {
			document.querySelector('#mainHeader .mdl-menu__container').classList.remove("is-visible");
		}, 250);
		this._userService.setLastLoggedInUserId(id);
		this.router.navigate(['SeriesList', {}]);
	}
	
	navigate(to:any) {
		this.router.navigate(to);
		document.querySelector('.chel-drawer').classList.remove("is-visible");
		document.querySelector('.mdl-layout__obfuscator').classList.remove("is-visible");
	}
}