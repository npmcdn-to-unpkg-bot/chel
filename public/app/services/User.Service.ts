import { Injectable } from 'angular2/core';

import { StorageService } from './Storage.Service';

export class User {
	constructor(public id: number, public name: string){
		
	}
}

var _mockUsers: User[] = [];
_mockUsers.push(new User(0, 'Mike'));
_mockUsers.push(new User(1, 'Sean'));
_mockUsers.push(new User(2, 'Joey'));

@Injectable()
export class UserService {
	constructor(private _storageService: StorageService) {
		
	}
	
	getUsers() {
		return Promise.resolve(_mockUsers);
	}

	// See the "Take it slow" appendix
	getUsersSlowly() {
		return new Promise<User[]>(resolve => setTimeout(()=>resolve(_mockUsers), 2000));
	}
	
	getUser(id: number) {
		return Promise.resolve(_mockUsers).then(
			users => users.filter(user => user.id === id)[0]
		);
	}
	
	setLastLoggedInUserId(id: number) {
		this._storageService.setLastLoggedInUserId(id);
	}
	
	getLastLoggedInUserId() {
		return this._storageService.getLastLoggedInUserId();
	}
}