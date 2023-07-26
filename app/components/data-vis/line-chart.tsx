"use client";

import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export interface LineChartProps {
    labels?: string[];
    data?: number[];
}
  
const LineChart: React.FC<LineChartProps> = (labels, data) => {
	return (
		<div>
			<Chart type="line" data={data} />
		</div>
	);
};

export default LineChart;