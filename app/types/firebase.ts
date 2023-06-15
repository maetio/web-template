import { OrderByDirection, Timestamp, WhereFilterOp } from 'firebase/firestore';
import { Competition } from 'src/types/competition';
import { Game } from 'src/types/game';
import { CompetitionProfile, GameProfile, Profile, TeamProfile } from 'src/types/profile';
import { CompetitionTeam, Team, TeamMessagesFireStore } from 'src/types/team';
import { PrivateUserData } from 'src/types/user';

/**
 * Define timestamp types that will be included in some firestore data.
 * This will need to be removed for rtk query
 */
export type StartTimestamp = { startTimestamp: Timestamp };
export type EndTimestamp = { endTimestamp: Timestamp };

/**
 * Collection data types for firestore
 *
 * @export
 * @interface CollectionDataTypes
 */
export interface CollectionDataTypes {
    'private-user-data': { id: string } & Partial<PrivateUserData>;
    profiles: Partial<Omit<Profile, 'id'>>;
    competitions: StartTimestamp & EndTimestamp & Partial<Omit<Competition, 'id'>>;
    teams: Partial<Omit<Team, 'id'>>;
    games: StartTimestamp & Partial<Omit<Game, 'id'>>;
    reports: { userID: string };
}
/**
 * Subcollectin data types for firestore
 *
 * @export
 * @interface SubcollectionDataTypes
 */
export interface SubcollectionDataTypes {
    'team-profiles': Partial<Omit<TeamProfile, 'id'>>;
    'team-messages': Partial<TeamMessagesFireStore>;
    'invited-emails': { email: string; teamID: string };
    'invited-team-profiles': { userID: string; teamID: string };
    'competition-teams': Partial<Omit<CompetitionTeam, 'id'> & EndTimestamp>;
    'competition-profiles': Partial<Omit<CompetitionProfile, 'id'> & EndTimestamp>;
    'game-profiles': Partial<Omit<GameProfile, 'id'> & StartTimestamp & EndTimestamp>;
    'report-competitions': { docID: string; votes: number };
    'report-teams': { docID: string; votes: number };
    'report-profiles': { docID: string; votes: number };
}

/**
 * Collection Group data types for firestore
 *
 * @export
 * @interface SubcollectionDataTypes
 */
export interface CollectionGroupDataTypes {
    'team-profiles-collection-group': SubcollectionDataTypes['team-profiles'];
    'competition-teams-collection-group': SubcollectionDataTypes['competition-teams'];
    'competition-profiles-collection-group': SubcollectionDataTypes['competition-profiles'];
    'game-profiles-collection-group': SubcollectionDataTypes['game-profiles'];
    'report-collection-group': SubcollectionDataTypes['report-profiles'];
}

// define the return data types
export type AllReturnDataTypes = CollectionDataTypes & SubcollectionDataTypes;
export type CollectionKey = keyof AllReturnDataTypes;

type ValueType<
    T extends CollectionKey,
    F extends (keyof AllReturnDataTypes[T] & string) | undefined,
> = F extends keyof AllReturnDataTypes[T] & string ? AllReturnDataTypes[T][F] : string;
/**
 * generic filters for the generate query function
 *
 * @interface DataFilters
 * @template T
 * @template F
 */
export interface DataFilters<
    T extends CollectionKey,
    F extends (keyof AllReturnDataTypes[T] & string) | undefined,
> {
    field: F;
    filter: WhereFilterOp;
    value: ValueType<T, F>;
}

/**
 * Interface defines the sorting criteria for a function
 *
 * @export
 * @interface Sorting
 * @template T
 */
export interface Sorting {
    field: string;
    direction: OrderByDirection;
}

/**
 * Generic Query for get data and firestore functions
 *
 * @export
 * @interface GenericQuery
 * @template T
 */
export interface GenericQuery<T extends CollectionKey> {
    collection: T;
    filters?: DataFilters<T, keyof AllReturnDataTypes[T] & string>[];
    sorting?: Sorting[];
    begID?: string | undefined;
    lim?: number;
    subcollectionID?: string;
}
