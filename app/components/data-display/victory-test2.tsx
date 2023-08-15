"use client";

import React from "react";
import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryHistogram,
} from "victory";
// const data= {[
//     { x: 1 },
//     { x: 2 },
//     { x: 2 },
//     { x: 4 },
//     { x: 4 },
//     { x: 5 }
//   ]}

interface VictoryTestParams {
	className: string;
}

const data = [1600, 1780, 1830, 1920, 1930, 1924, 1975, 2025, 2060];

const binEdges = [0, 1700, 1850, 1950, 2050, Infinity];

const histogramData = binEdges.map((edge, index) => ({
	x: index,
	y: data.filter((rating) => rating >= edge && rating < binEdges[index + 1])
		.length,
}));

export const VictoryTest2: React.FC<VictoryTestParams> = ({ className }) => {
	const tickLabels = [
		"<1700",
		"1701-1850",
		"1851-1950",
		"1951-2050",
		">2050",
	];

	return (
		<div className={className}>
			<VictoryChart>
				<VictoryBar data={histogramData} x="x" y="y" />
				{/* <VictoryAxis dependentAxis tickFormat={(y) => `${y}`} />
				 */}

				{/* <VictoryAxis dependentAxis tickFormat={(y) => `${y}`} /> */}
				<VictoryAxis
					tickValues={histogramData.map((dataPoint) => dataPoint.x)}
					tickFormat={(tickIndex) => tickLabels[tickIndex]}
				/>
			</VictoryChart>
		</div>
	);
};
