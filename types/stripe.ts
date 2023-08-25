// import { Timestamp } from "firebase/firestore";
import { Timestamp } from "firebase-admin/firestore";
import Stripe from "stripe";

export interface TransactionEvents {
	userID: string;
	eventType: number;
	eventDescription?: string;
	timeStamp: Timestamp;
	actionID: string;
	customerID: string | Stripe.Customer | Stripe.DeletedCustomer | null;
	destinationAccount: string | Stripe.Account | undefined;
	latest_charge: string | Stripe.Charge | null | undefined;
	amount: number;
	amountFee: number | null;
}

// {
//     userID: string | undefined;
//     eventType: number;
//     timeStamp: Timestamp;
//     actionID: string;
//     customerID: string | Stripe.Customer | Stripe.DeletedCustomer | null;
//     destinationAccount: string | ... 1 more ... | undefined;
//     latest_charge: string | ... 2 more ... | undefined;
//     amount: number;
//     amountFee: number | null;
// }
