import { Injectable } from 'angular2/core';

@Injectable()
export class StorageService {
	namespace: string = 'chelApp-';
	
	setLastLoggedInUserId(id: string) {
		if(typeof(localStorage) !== 'undefined') {
			localStorage.setItem(this.namespace + 'lastLoggedInUserId', id);
		}
	}

	getLastLoggedInUserId() : number {
		let id = parseInt(localStorage.getItem(this.namespace + 'lastLoggedInUserId'));
		return id >= 0 ? id : -1;
	}
}