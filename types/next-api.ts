import { CollectionDataTypes, SubcollectionDataTypes } from ".";

/**
 * Reponse type defined here important for importing into the components that hit this api
 */
export type CompetitionsResponseType = ({ id: string } & Partial<CollectionDataTypes["competitions"]>)[];

export type PlayersResponseType = ({ id: string } & Partial<SubcollectionDataTypes["competition-profiles"]>)[];

export type PlayerResponseType = ({ id: string } & Partial<CollectionDataTypes["profiles"]>);

export type TeamsResponseType = ({ id: string } & Partial<SubcollectionDataTypes["competition-teams"]>)[];