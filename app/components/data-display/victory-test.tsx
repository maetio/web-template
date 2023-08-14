"use client";

import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

const data = [
	{ quarter: 1, earnings: 3, label: 1 },
	{ quarter: 2, earnings: 6, label: 2 },
	{ quarter: 3, earnings: 7, label: 3 },
	{ quarter: 4, earnings: 4, label: 4 },
];

interface VictoryTestParams {
	className: string;
}

export const VictoryTest: React.FC<VictoryTestParams> = ({ className }) => {
	return (
		<div className={className}>
			<VictoryChart>
				<VictoryBar
					cornerRadius={{
						bottomLeft: 4,
						bottomRight: 4,
						topLeft: 4,
						topRight: 4,
					}}
					style={{
						data: {
							fill: "#A5B4FC",
							width: 50,
							// strokeLinejoin: "round",
							// strokeWidth: 6,
						},
					}}
					data={data}
					x="quarter"
					y="earnings"
				/>
				<VictoryAxis
					style={{ axis: { stroke: "none" } }}
					tickValues={[
						"< 1700",
						"1751-1850",
						"1851-1950",
						"1951-2050",
						"2050 <",
					]}
				/>
			</VictoryChart>
		</div>
	);
};
