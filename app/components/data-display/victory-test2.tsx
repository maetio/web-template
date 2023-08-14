"use client";

import React from "react";
import { VictoryChart, VictoryHistogram } from "victory";

const data = [1220, 1600, 2000];

interface VictoryTestParams {
	className: string;
}

const bins = [
	{ bin: "< 1700", range: (value) => value < 1700 },
	{ bin: "1751-1850", range: (value) => value >= 1751 && value <= 1850 },
	{ bin: "1851-1950", range: (value) => value >= 1851 && value <= 1950 },
	{ bin: "1951-2050", range: (value) => value >= 1951 && value <= 2050 },
	{ bin: "2050 <", range: (value) => value > 2050 },
];

export const VictoryTest: React.FC<VictoryTestParams> = ({ className }) => {
	return (
		<div className={className}>
			<VictoryChart>
				<VictoryHistogram data={data} bins={bins} />
			</VictoryChart>
		</div>
	);
};
