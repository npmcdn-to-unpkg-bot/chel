import { Component, provide, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import 'rxjs/Rx';

import {MDL} from '../MaterialDesignLite.Directive';

import { StorageService } from '../services/Storage.Service';
import { GameService } from '../services/Game.Service';
import { User, UserService } from '../services/User.Service';
import { TeamService } from '../services/Team.Service';
import { SeriesService } from '../services/Series.Service';
import { SeriesNumberService } from '../services/SeriesNumber.Service';

import { LoginComponent } from '../Login/Login.Component';
import { SeriesListComponent } from '../SeriesList/SeriesList.Component';
import { SeriesDetailComponent } from '../SeriesDetail/SeriesDetail.Component';
import { GameListComponent } from '../GameList/GameList.Component';
import { SettingsComponent } from '../Settings/Settings.Component';
import { StatisticsComponent } from '../Statistics/Statistics.Component';

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
		HTTP_PROVIDERS,
		StorageService,
		GameService,
		UserService,
		TeamService,
		SeriesService,
		SeriesNumberService,
		provide(LocationStrategy, {useClass: HashLocationStrategy})
	]
})
@RouteConfig([
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent
	},
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
	},
	{
		path: '/statistics/',
		name: 'Statistics',
		component: StatisticsComponent
	}
])
export class AppComponent implements OnInit{
	title = 'Chel';
	users: User[] = [];
	loggedInUserId: string = '';
	loggedInUserName: string = ''; 
	
	constructor(
		public router: Router,
		private _userService: UserService) {
	}
	
	ngOnInit() {
		this._userService.getUsers().subscribe(users => {
			this.users = users;
			console.log(this.users);
			this.loggedInUserId = this._userService.getLastLoggedInUserId();
			console.log(this.loggedInUserId);
			this.loggedInUserName = this.users.filter(user => user.id === this.loggedInUserId)[0].name;
		});
		
		/*.then(users => {
			this.users = users;
			this.loggedInUserId = this._userService.getLastLoggedInUserId();
			this.loggedInUserName = this.users.filter(user => user.id == this.loggedInUserId)[0].name;
		});*/
	}
	
	addUser() {
		console.log('adding user...');
	}
	
	setUser(id: string) {
		this.loggedInUserId = id;
		this.loggedInUserName = this.users.filter(user => user.id === id)[0].name;
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