"use client";

import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

interface VictoryTestParams {
	className: string;
	data: {
		x: number | string;
		y: number;
		// label?: string;
	}[];
	tickLabels: string[];
}

export const VictoryTest: React.FC<VictoryTestParams> = ({
	className,
	data,
	tickLabels,
}) => {
	const largestValue = Math.max(...data.map((dataPoint) => dataPoint.y));
	const largestValueIndex = data.findIndex(
		(dataPoint) => dataPoint.y === largestValue
	);

	return (
		<div className={className}>
			<VictoryChart>
				<VictoryBar
					cornerRadius={{
						bottomLeft: 6,
						bottomRight: 6,
						topLeft: 6,
						topRight: 6,
					}}
					// style={{
					// 	data: {
					// 		fill: (d) =>
					// 			d.x === largestValueIndex ? "red" : "blue",
					// 	},
					// }}

					style={{
						data: {
							fill: (d) =>
								d.x === largestValueIndex ? "red" : "blue",
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
