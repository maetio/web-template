"use client";

import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export interface LineChartProps {
    title?: string
    labels?: Array<string | undefined>;
    dataset?: Array<number | undefined>;
}
  
const LineChart: React.FC<LineChartProps> = ({title, labels, dataset}) => {
	const data = {
		labels,
		// datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
		datasets: [
			{
				label: title,
				data: dataset,
				// you can set individual colors for each bar
				backgroundColor: [
					"rgba(255, 255, 255, 0.6)",
					"rgba(255, 255, 255, 0.6)",
					"rgba(255, 255, 255, 0.6)"
				],
				borderWidth: 1,
			}
		]
	};

	return (
		<div>
			<Chart type="line" data={data} />
		</div>
	);
};

export default LineChart;