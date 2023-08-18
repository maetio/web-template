"use client";

import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

interface VictoryBarGraphParams {
	className: string;
	data: {
		x: number | string;
		y: number;
		label?: string;
	}[];
	tickLabels: string[];
}

export /**
 * takes in x and y data and tickLabels to display a bar graph
 *
@remarks
 * can be upgraded later, depending on future graph needs
 *
 * @param {*} {
 * 	className,
 * 	data,
 * 	tickLabels,
 * }
 * @return {*}
 */
const VictoryBarGraph: React.FC<VictoryBarGraphParams> = ({
	className,
	data,
	tickLabels,
}) => {
	return (
		<div className={className}>
			<VictoryChart padding={{ left: 60, top: 25, bottom: 35 }}>
				<VictoryBar
					cornerRadius={{
						bottomLeft: 6,
						bottomRight: 6,
						topLeft: 6,
						topRight: 6,
					}}
					style={{
						data: {
							fill: "#4F46E5",
							width: 60,
						},
					}}
					data={data}
					x="x"
					y="y"
				/>

				<VictoryAxis
					tickValues={data.map((dataPoint) => dataPoint.x)}
					tickFormat={(tickIndex) => tickLabels[tickIndex]}
					style={{ axis: { stroke: "none" } }}
				/>
			</VictoryChart>
		</div>
	);
};
