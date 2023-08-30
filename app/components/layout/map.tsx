import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent: React.FC<{
	lat: number;
	lng: number;
	text: string;
}> = ({ text }: { text: string }) => (
	<div
		style={{
			color: "white",
			background: "grey",
			padding: "15px 10px",
			display: "inline-flex",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "100%",
			transform: "translate(-50%, -50%)",
		}}
	>
		{text}
	</div>
);

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
		<div style={{ height: "400px", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "" }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<AnyReactComponent
					lat={59.955413}
					lng={30.337844}
					text="My Marker"
				/>
			</GoogleMapReact>
		</div>
	);
}
