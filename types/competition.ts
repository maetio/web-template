import { Rating } from "./rating";
import { Location } from "./location";

/**
 * Type for all competitions
 * We will extend this type for the specific competition types in the future
 *
 * @export
 * @interface Competition
 */
export interface Competition {
	id: string;
	description?: string;
	sport: "basketball" | "soccer" | "volleyball" | "pickleball";
	type: "session" | "tournament" | "league";
	name: string;
	image: string;
	startTimeISO: string;
	endTimeISO: string;
	price?: number;
	location: Location;
	hostID: string;
	rating?: Rating;
	totalPlayers?: number;
	totalTeams?: number;
	maxPlayers?: number;
	minutesPerGame?: number;
	registrationOpen: boolean;
}

/**
 * Wins, losses, and rating change can just be calculated from a game query with the team id
 *
 * @export
 * @interface UserCompetition
 */
export interface UserCompetition {
	id: string;
	// to access the team in the competition
	teamID: string;
}

export interface TeamCompetition extends UserCompetition {
	id: string;
}

// each sport prop will have a MUI icon and sport name associated with it
export interface Sports {
	sportName?: string;
	icon?: React.ReactNode;
}
