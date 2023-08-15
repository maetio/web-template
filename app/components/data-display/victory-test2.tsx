"use client";

import React from "react";
import { VictoryChart, VictoryHistogram } from "victory";
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

const bins = [0, 1750, 1850, 1950, 2050];

export const VictoryTest2: React.FC<VictoryTestParams> = ({ className }) => {
	return (
		<div className={className}>
			<VictoryChart>
				<VictoryHistogram
					bins={bins}
					binSpacing={20}
					data={[
						{ x: 1760 },
						{ x: 2500 },
						{ x: 1000 },
						{ x: 1000 },
						{ x: 1600 },
						{ x: 2000 },
					]}
				/>
			</VictoryChart>
		</div>
	);
};
