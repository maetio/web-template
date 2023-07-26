"use client";

import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export interface LineChartProps {
    title?: string;
    dataset?: Array<number | undefined>;
    labels?: Array<string | undefined>; 
    variable?: string;
}
  
const LineChart: React.FC<LineChartProps> = ({title, dataset, labels, variable}) => {
	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		// datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
		datasets: [
			{
				label: variable,
				data: dataset,
				lineTension: 0.6,
				// you can set individual colors for each bar
				backgroundColor:
					"rgb(129, 140, 248, 0.3)"
				,
				borderWidth: 1,
				borderColor: "rgb(129, 140, 248)",
				fill: true

			}
		]
          
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					font: {
						family: "Nunito"
					}
				},
				position: "top" as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
		scales: {
			x: {
				display: false
			},
			y: {
				display: false
			}
		}
	};

	return (
		<div>
			<Chart type="line" data={data} options={options} />
		</div>
	);
};

export default LineChart;