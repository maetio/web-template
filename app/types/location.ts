/**
 * Interface for the competition data
 *
 * @export
 * @interface Location
 */
export interface Location {
    name: string;
    description?: string;
    address?: string;
    geohash?: string;
    latitude: number;
    longitude: number;
}

/**
 * Used for doing geoqueries
 *
 * @export
 * @interface LocationQuery
 */
export interface LocationQuery {
    centerLatitude: number;
    centerLongitude: number;
    radiusInM: number;
    locationLimit: number;
}
