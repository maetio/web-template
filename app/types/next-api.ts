import { CollectionDataTypes } from "app/types";

/**
 * Reponse type defined here important for importing into the components that hit this api
 */
export type CompetitionsResponseType = ({ id: string } & Partial<CollectionDataTypes["competitions"]>)[];