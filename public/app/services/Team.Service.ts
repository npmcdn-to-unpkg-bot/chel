import { Injectable } from 'angular2/core';

export interface Team {
	id: number;
	city: string;
	name: string;
	logo: string;
}

var _mockTeams: Team[] = [
	// Central Division
	{"id": 0, "location": "Chicago", "name": "Blackhawks", "logo": "images/teams/blackhawks.png"},
	{"id": 1, "location": "Colorado", "name": "Avalanche", "logo": "images/teams/avalanche.png"},
	{"id": 2, "location": "Dallas", "name": "Stars", "logo": "images/teams/stars.png"},
	{"id": 3, "location": "Minnesota", "name": "Wild", "logo": "images/teams/wild.png"},
	{"id": 4, "location": "Nashville", "name": "Predators", "logo": "images/teams/predators.png"},
	{"id": 5, "location": "St. Louis", "name": "Blues", "logo": "images/teams/blues.png"},
	{"id": 6, "location": "Winnipeg", "name": "Jets", "logo": "images/teams/jets.png"},
	
	// Atlantic Division
	{"id": 7, "location": "Boston", "name": "Bruins", "logo": "images/teams/bruins.png"},
	{"id": 8, "location": "Buffalo", "name": "Sabres", "logo": "images/teams/sabres.png"},
	{"id": 9, "location": "Detroit", "name": "Red Wings", "logo": "images/teams/red-wings.png"},
	{"id": 10, "location": "Florida", "name": "Panthers", "logo": "images/teams/panthers.png"},
	{"id": 11, "location": "Montreal", "name": "Canadiens", "logo": "images/teams/canadiens.png"},
	{"id": 12, "location": "Ottowa", "name": "Senators", "logo": "images/teams/senators.png"},
	{"id": 13, "location": "Tampa Bay", "name": "Lightning", "logo": "images/teams/lightning.png"},
	{"id": 14, "location": "Toronto", "name": "Maple Leafs", "logo": "images/teams/maple-leafs.png"},
	
	// Pacific Division
	{"id": 15, "location": "Anaheim", "name": "Ducks", "logo": "images/teams/ducks.png"},
	{"id": 16, "location": "Arizona", "name": "Coyotes", "logo": "images/teams/coyotes.png"},
	{"id": 17, "location": "Calgary", "name": "Flames", "logo": "images/teams/flames.png"},
	{"id": 18, "location": "Edmonton", "name": "Oilers", "logo": "images/teams/oilers.png"},
	{"id": 19, "location": "Los Angeles", "name": "Kings", "logo": "images/teams/kings.png"},
	{"id": 20, "location": "San Jose", "name": "Sharks", "logo": "images/teams/sharks.png"},
	{"id": 21, "location": "Vancouver", "name": "Canucks", "logo": "images/teams/canucks.png"},
	
	// Metropolitan Division
	{"id": 22, "location": "Carolina", "name": "Hurricanes", "logo": "images/teams/hurricanes.png"},
	{"id": 23, "location": "Columbus", "name": "Blue Jackets", "logo": "images/teams/blue-jackets.png"},
	{"id": 24, "location": "New Jersey", "name": "Devils", "logo": "images/teams/devils.png"},
	{"id": 25, "location": "New York", "name": "Rangers", "logo": "images/teams/rangers.png"},
	{"id": 26, "location": "Philadelphia", "name": "Flyers", "logo": "images/teams/flyers.png"},
	{"id": 27, "location": "Pittsburgh", "name": "Penguins", "logo": "images/teams/penguins.png"},
	{"id": 28, "location": "Washington", "name": "Capitals", "logo": "images/teams/capitals.png"},
	{"id": 29, "location": "New York", "name": "Islanders", "logo": "images/teams/islanders.png"}
];

@Injectable()
export class TeamService {
	getTeams() {
		return Promise.resolve(_mockTeams);
	}

	// See the "Take it slow" appendix
	/*getGamesSlowly() {
		return new Promise<Hero[]>(resolve => setTimeout(()=>resolve(_mockGames), 2000) // 2 seconds);
	}*/

	getTeam(id: number) {
		return Promise.resolve(_mockTeams).then(teams => teams.filter(team => team.id === id)[0]);
	}
}