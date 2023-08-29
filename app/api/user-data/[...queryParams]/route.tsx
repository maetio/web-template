import { privateUserCollection } from "config/server";
import { NextResponse } from "next/server";
import { PrivateUserData } from "types/user";

/**
 * api that turn basic private-user-date information such as image
 * firstname and lastname
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {(Promise<
 * 	NextResponse<
 * 		Pick<PrivateUserData, "firstName" & "lastName" & "image" & "id">
 * 	>
 * >)}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
): Promise<
	NextResponse<
		Pick<PrivateUserData, "firstName" & "lastName" & "image" & "id">
	>
> {
	// get the parameters from the query
	const [hostID] = params.queryParams;

	try {
		if (hostID) {
			const hostRef = await privateUserCollection.doc(hostID).get();
			const hostData = hostRef.data();
			return NextResponse.json({
				firstName: hostData?.firstName,
				lastName: hostData?.lastName,
				image: hostData?.image,
				id: hostID,
			});
		}
		throw Error("API route requires host ID");
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}

/**
 * Revalidate the api route every 60 seconds
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidation-frequency
 */
export const revalidate = 60;
