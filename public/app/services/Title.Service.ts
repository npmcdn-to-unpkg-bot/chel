import { Injectable } from 'angular2/core';

@Injectable()
export class TitleService {
	constructor() {
		
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