import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

export class Team {
	constructor(public id: string,
				public city: string,
				public name: string,
				public logoUrl: string) {
					
	}
}

/*var _mockTeams: Team[] = [
	// Central Division
	{"id": 0, "location": "Chicago", "name": "Blackhawks", "logoUrl": "images/teams/blackhawks.png"},
	{"id": 1, "location": "Colorado", "name": "Avalanche", "logoUrl": "images/teams/avalanche.png"},
	{"id": 2, "location": "Dallas", "name": "Stars", "logoUrl": "images/teams/stars.png"},
	{"id": 3, "location": "Minnesota", "name": "Wild", "logoUrl": "images/teams/wild.png"},
	{"id": 4, "location": "Nashville", "name": "Predators", "logoUrl": "images/teams/predators.png"},
	{"id": 5, "location": "St. Louis", "name": "Blues", "logoUrl": "images/teams/blues.png"},
	{"id": 6, "location": "Winnipeg", "name": "Jets", "logoUrl": "images/teams/jets.png"},
	
	// Atlantic Division
	{"id": 7, "location": "Boston", "name": "Bruins", "logoUrl": "images/teams/bruins.png"},
	{"id": 8, "location": "Buffalo", "name": "Sabres", "logoUrl": "images/teams/sabres.png"},
	{"id": 9, "location": "Detroit", "name": "Red Wings", "logoUrl": "images/teams/red-wings.png"},
	{"id": 10, "location": "Florida", "name": "Panthers", "logoUrl": "images/teams/panthers.png"},
	{"id": 11, "location": "Montreal", "name": "Canadiens", "logoUrl": "images/teams/canadiens.png"},
	{"id": 12, "location": "Ottowa", "name": "Senators", "logoUrl": "images/teams/senators.png"},
	{"id": 13, "location": "Tampa Bay", "name": "Lightning", "logoUrl": "images/teams/lightning.png"},
	{"id": 14, "location": "Toronto", "name": "Maple Leafs", "logoUrl": "images/teams/maple-leafs.png"},
	
	// Pacific Division
	{"id": 15, "location": "Anaheim", "name": "Ducks", "logoUrl": "images/teams/ducks.png"},
	{"id": 16, "location": "Arizona", "name": "Coyotes", "logoUrl": "images/teams/coyotes.png"},
	{"id": 17, "location": "Calgary", "name": "Flames", "logoUrl": "images/teams/flames.png"},
	{"id": 18, "location": "Edmonton", "name": "Oilers", "logoUrl": "images/teams/oilers.png"},
	{"id": 19, "location": "Los Angeles", "name": "Kings", "logoUrl": "images/teams/kings.png"},
	{"id": 20, "location": "San Jose", "name": "Sharks", "logoUrl": "images/teams/sharks.png"},
	{"id": 21, "location": "Vancouver", "name": "Canucks", "logoUrl": "images/teams/canucks.png"},
	
	// Metropolitan Division
	{"id": 22, "location": "Carolina", "name": "Hurricanes", "logoUrl": "images/teams/hurricanes.png"},
	{"id": 23, "location": "Columbus", "name": "Blue Jackets", "logoUrl": "images/teams/blue-jackets.png"},
	{"id": 24, "location": "New Jersey", "name": "Devils", "logoUrl": "images/teams/devils.png"},
	{"id": 25, "location": "New York", "name": "Rangers", "logoUrl": "images/teams/rangers.png"},
	{"id": 26, "location": "Philadelphia", "name": "Flyers", "logoUrl": "images/teams/flyers.png"},
	{"id": 27, "location": "Pittsburgh", "name": "Penguins", "logoUrl": "images/teams/penguins.png"},
	{"id": 28, "location": "Washington", "name": "Capitals", "logoUrl": "images/teams/capitals.png"},
	{"id": 29, "location": "New York", "name": "Islanders", "logoUrl": "images/teams/islanders.png"}
];*/

@Injectable()
export class TeamService {
	private _uri: string = '/api/teams/';
	
	constructor(private http: Http) {}
	
	getTeams() {
		return this.http.get(this._uri).map( responseData => {
			return responseData.json();
		})
		.map((teams: Array<any>) => {
			let result:Array<Team> = [];
			if (teams) {
				teams.forEach((team) => {
					result.push(new Team(
						team._id,
						team.city,
						team.name,
						team.logoUrl
					));
				});
			}
			return result;
		});
	}

	getTeam(id: string) {
		return this.http.get(this._uri + id).map( responseData => {
			let d = responseData.json();
			return new Team(
				d._id,
				d.city,
				d.name,
				d.logoUrl
			);
		});
	}
}