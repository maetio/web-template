import { PlayerResponseType } from "types/next-api";
import { NextResponse } from "next/server";
import { bucket } from "config/server";

/**
 * API endpont for fetching a profile by id
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<PlayerResponseType>>}
 */
export async function POST(
	request: Request,
	{ params }: { params: { id: string | undefined } }
): Promise<NextResponse<any>> {
	// get the parameters from the query

	try {
		if (params.id) {
			const data = await request.formData();
			const files = data.get("file");

			console.log("file in server", files);

			// Ensure that a file was uploaded
			if (files) {
				// Convert the Blob to an ArrayBuffer
				const arrayBuffer = await files.arrayBuffer();

				// Convert the ArrayBuffer to a Uint8Array
				const uint8Array = new Uint8Array(arrayBuffer);

				// Convert the Uint8Array to a Buffer
				const buffer = Buffer.from(uint8Array);

				console.log("buffer", buffer);

				// Create a path for the image
				const path = `venue/${params.id}`;

				// Create a reference to the storage bucket
				const file = bucket.file(path);

				// Define custom metadata if needed
				const customMetadata = {
					blurred: "false",
				};

				// Upload the image and set custom metadata
				await file.save(buffer, {
					metadata: {
						customMetadata,
					},
				});

				// Get the download URL
				const [url] = await file.getSignedUrl({
					action: "read",
					expires: "2099-12-31", // Adjust the expiration date as needed
				});

				return NextResponse.json(url);
			}
		}
		throw Error("API route requires a profile id");
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
