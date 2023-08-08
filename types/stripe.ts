import { Timestamp } from "firebase/firestore";

export interface TransactionEvents {
	userID: string;
	eventType: number;
	eventDescription?: string;
	timeStamp: Timestamp;
	actionID: string;
	customerID: string;
	destinationAccount: string;
	latest_charge: string;
	amount: number;
	type: string;
}
