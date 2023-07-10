import { CollectionDataTypes, SubcollectionDataTypes } from "app/types";

/**
 * Reponse type defined here important for importing into the components that hit this api
 */
export type CompetitionsResponseType = ({ id: string } & Partial<CollectionDataTypes["competitions"]>)[];

export type PlayersResponseType = ({ id: string } & Partial<SubcollectionDataTypes["competition-profiles"]>)[];

export type TeamsResponseType = ({ id: string } & Partial<SubcollectionDataTypes["competition-teams"]>)[];