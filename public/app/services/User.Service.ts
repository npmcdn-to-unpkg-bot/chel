import { Injectable } from 'angular2/core';

import { Http } from 'angular2/http';

import { StorageService } from './Storage.Service';

export class User {
	constructor(public id: string, public name: string){
		
	}
}

var _mockUsers: User[] = [];
_mockUsers.push(new User('56e0cb6e901e9c6337b92345', 'Mike'));
_mockUsers.push(new User('56e0cbe5901e9c6337b92346', 'Sean'));
_mockUsers.push(new User('56e0cbe9901e9c6337b92347', 'Joey'));

@Injectable()
export class UserService {
	private _uri: string = '/api/users/';
	
	constructor(
		public http: Http,
		private _storageService: StorageService) {
		
	}
	
	getUsers() {
		//return Promise.resolve(_mockUsers);
		return this.http.get(this._uri).map( responseData => {
			return responseData.json();
		})
		.map((users: Array<any>) => {
			let result:Array<User> = [];
			if (users) {
				users.forEach((user) => {
					result.push(new User(user._id, user.name));
				});
			}
			return result;
		});
	}
	
	getUser(id: string) {
		/*return Promise.resolve(_mockUsers).then(
			users => users.filter(user => user.id === id)[0]
		);*/
		
		return this.http.get(this._uri + id).map( responseData => {
			let d = responseData.json();
			return new User(d._id, d.name);
		});
	}
	
	setLastLoggedInUserId(id: string) {
		this._storageService.setLastLoggedInUserId(id);
	}
	
	getLastLoggedInUserId() {
		return this._storageService.getLastLoggedInUserId();
	}
}