import { Rating } from 'src/types/rating';
import { Location } from './location';

/**
 * Type for all competitions
 * We will extend this type for the specific competition types in the future
 *
 * @export
 * @interface Competition
 */
export interface Competition {
    id: string;
    sport: 'basketball' | 'soccer' | 'volleyball' | 'pickleball';
    type: 'session' | 'tournament' | 'league';
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
