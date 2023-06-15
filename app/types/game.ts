import { Competition } from 'app/types/competition';
import { Rating } from 'app/types/rating';

// define the displayed game status
export type DisplayedGameStatus = 'pending' | 'unreported' | 'scheduled' | 'verified';
export interface Game {
    id: string;
    team1: {
        id?: string;
        rating?: Rating;
        deltaRating?: Rating;
        averagePlayerRating?: Rating;
        image?: string;
        firstName?: string;
        lastName?: string;
        points?: number | null;
    };
    team2: {
        id?: string;
        rating?: Rating;
        deltaRating?: Rating;
        averagePlayerRating?: Rating;
        image?: string;
        firstName?: string;
        lastName?: string;
        points?: number | null;
    };
    sport: Competition['sport'];
    // need for an "in" query to find games associated with a team
    teamIDs: string[];
    // need to find the games for a certain competition
    competitionID: string;
    competitionName: string;
    // important for finding the number of correctly verified games
    hostID: string;
    startTimeISO: string;
    comments?: string;

    // boolean that will say whether the function has gone back to rate this game
    serverRated: boolean;
}
