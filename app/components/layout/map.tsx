"use client";

import React from "react";
import GoogleMapReact from "google-map-react";
import { AnyReactComponent } from "./map-marker";

export async function SimpleMap({
	lat,
	lng,
	zoom,
}: {
	lat: number;
	lng: number;
	zoom: number;
}) {
	const defaultProps = {
		center: {
			lat,
			lng,
		},
		zoom,
	};

	return (
		// Important! Always set the container height explicitly
		<div
			style={{
				overflow: "hidden",
				borderRadius: "1rem",
				height: "232px",
				width: "100%",
			}}
		>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
				}}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<AnyReactComponent
					lat={defaultProps.center.lat}
					lng={defaultProps.center.lng}
					text="My Marker"
				/>
			</GoogleMapReact>
		</div>
	);
}
