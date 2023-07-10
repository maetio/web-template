import { Competition } from "./competition";
import { Game } from "./game";
import { Rating } from "./rating";

/**
 * Will define the profile for a given sport and profile type
 *
 * @remarks
 * For instance, could be a "basketball host" or "volleyball player"
 *
 * @export
 * @interface Profile
 */
export interface Profile {
	id: string;
	firstName: string | null;
	lastName: string | null;
	image: string | null;
	userID: string;
	type: "host" | "player";
	sport: Competition["sport"];
	deltaRating?: Rating;
	// current rating of the profile
	rating: Rating;
}

type Status = "active" | "inactive" | "declined" | "invited";

/**
 * Will show the profiles that have played in a game. Could include coaches in future.
 *
 * @export
 * @interface GameProfile
 * @extends {Profile}
 */
export interface GameProfile extends Profile {
	// should be the same as the user id
	id: string;
	profileID: string;
	teamID: string;
	isCaptain: boolean;

	// all taken from the game
	gameID: Game["id"];
	sport: Game["sport"];
	competitionID: Game["competitionID"];
	// boolean that will say if the server has gone back over the rating system
	serverRated: boolean;
	status: Status;
}

/**
 * Profiles of team members, Could include coaches in future.
 *
 * @export
 * @interface TeamProfile
 * @extends {Profile}
 */
export interface TeamProfile extends Profile {
	status: Status;
	teamID: string;
	profileID: string;
	dateJoinedISO: string;
	dateLeftISO: string | null;
}

/**
 * Profiles of competition members, Could include coaches in future.
 *
 * @export
 * @interface CompetitionProfile
 * @extends {Profile}
 */
export interface CompetitionProfile extends Profile {
	teamID: string; // double read to show the team icon
	profileID: string;
	competitionID: string;
	competitionEndTimeISO: string | null;
	teamFirstName: string;
	teamLastName: string;
}
