import { Competition } from "app/types/competition";
import { Rating } from "app/types/rating";
import { Location } from "app/types/location";
import { Timestamp } from "firebase/firestore";

/**
 * Team interface, will have a list of users on it
 * Users will be a subcollection
 * firstName is the organization,
 *
 * @export
 * @interface Team
 */
export interface Team {
    id: string;
    numPlayers?: number;
    sport: Competition["sport"];
    location: Location;
    rating: Rating;
    image: string;
    // organization, city, school
    firstName?: string;
    // name or team mascot
    lastName: string;
    captainID: string;
    deltaRating?: Rating;
    // code to join the team
    joinCode: string;

    // boolean determines whether the team has played within rating period
    playedWithinRatingPeriod: boolean;

    // booleans that determine whether to update the team rating
    updatedAvgPlayerRating: boolean;
    averagePlayerRating: Rating;
}

/**
 * Interface will describe a team in a competition
 *
 * @export
 * @interface CompetitionTeam
 */
export interface CompetitionTeam extends Team {
    id: string;
    teamID: string;
    competitionID: string;
    status: "active" | "inactive" | "declined" | "invited";
    endTimeISO: string;
}

/**
 * Will show some brief information that will be combined with the team interface
 *
 * @export
 * @interface UserTeam
 */
export interface UserTeam {
    id: string;
    // rating over the course of their duration in the competition
    deltaRating?: Rating;
    dateJoinedISO: string;
}

/**
 * Front End TeamMessage type, includes timeStampISO, and does not have a TimeStamp type
 *
 * @export
 * @interface TeamMessages
 */
export interface TeamMessages {
    userID: string;
    message: string;
    userImage?: string;
    timeStampISO: string;
    userInitials: string;
}

/**
 * The TeamMessages subcollection data type. Should be the same for any new messaging systems we make
 * Includes timeStamp for being able to convert that into an ISO string on the frontend to reduce document fields
 *
 * @export
 * @interface TeamMessagesFireStore
 * @extends {Omit<TeamMessages, 'timeStampISO'>}
 */
export interface TeamMessagesFireStore extends Omit<TeamMessages, "timeStampISO"> {
    timeStamp: Timestamp;
}
