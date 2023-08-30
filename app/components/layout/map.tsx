"use client";

import React from "react";
import GoogleMapReact from "google-map-react";
import { AnyReactComponent } from "./map-marker";

export async function SimpleMap() {
	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627,
		},
		zoom: 11,
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
					lat={10.99835602}
					lng={77.01502627}
					text="My Marker"
				/>
			</GoogleMapReact>
		</div>
	);
}
