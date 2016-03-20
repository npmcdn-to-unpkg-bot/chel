import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteParams } from 'angular2/router';

import { MDL } from '../MaterialDesignLite.Directive';

import { User, UserService } from '../services/User.Service';

@Component({
	selector: 'login',
	templateUrl: 'app/Login/Login.Component.html',
	styleUrls: ['app/Login/Login.Component.css'],
	directives: [
		MDL,
		CORE_DIRECTIVES
	]
})
export class LoginComponent implements OnInit {
	users: User[] = [];

	constructor(
		private _userService: UserService) {}

	ngOnInit() {
		this._userService.getUsers().subscribe(users => {
			this.users = users;
		});
	}
}