"use client";

import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

interface VictoryTestParams {
	className: string;
	data: {
		x: string;
		y: number;
		label: string;
	}[];
}

export const VictoryTest: React.FC<VictoryTestParams> = ({
	className,
	data,
}) => {
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
					style={{
						data: {
							fill: "#A5B4FC",
							width: 50,
						},
					}}
					data={data}
					x="x"
					y="y"
				/>
				<VictoryAxis
					tickValues={[
						"< 1700",
						"1751-1850",
						"1851-1950",
						"1951-2050",
						"2050 <",
					]}
					style={{ axis: { stroke: "none" } }}
				/>
			</VictoryChart>
		</div>
	);
};
