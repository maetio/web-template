export interface Venue {
	id: string;
	hostID: string;
	name: string;
	location: Location;
	pricePerHour: number;
	images: string[];
	email: string; // can be the host's email automatically
	phoneNumber: string; // or should this be number
	status: "unverified" | "verified" | "banned";
	type: "indoor" | "outdoor";
	nets: "permanent" | "portable" | "none" | "tennis";
	lines: "permanent" | "none" | "chalk" | "tape";
	website: string | null;
	about: string | null;
}
