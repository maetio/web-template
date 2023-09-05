"use client";

import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
// import { VictoryLabel } from "victory-core";

export const VictoryWinProb = ({ value }: { value: number }) => {
	const [percent, setPercent] = useState(0);
	// Update the percent value when the 'value' prop changes
	useEffect(() => {
		setPercent(value);
	}, [value]);

	return (
		<div>
			<svg viewBox="0 0 200 200" width="200" height="200">
				<VictoryPie
					standalone={false}
					animate={{ duration: 1000 }}
					width={44}
					height={44}
					data={[
						{ x: 1, y: percent },
						{ x: 2, y: 100 - percent },
					]}
					innerRadius={20}
					cornerRadius={25}
					labels={() => null}
					style={{
						data: {
							fill: ({ datum }) => {
								const color = datum.y > 30 ? "green" : "red";
								return datum.x === 1 ? color : "transparent";
							},
						},
					}}
				/>
				<VictoryAnimation duration={1000} data={{ percent }}>
					{(newProps) => {
						return (
							<VictoryLabel
								textAnchor="middle"
								verticalAnchor="middle"
								x={44}
								y={44}
								text={`${Math.round(
									Number(newProps.percent)
								)}%`}
								style={{ fontSize: 12 }}
							/>
						);
					}}
				</VictoryAnimation>
			</svg>
		</div>
	);
};
