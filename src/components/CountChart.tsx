"use client";

import Image from "next/image";
import React from "react";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
	{
		name: "Total",
		count: 106,
		fill: "white"
	},
	{
		name: "Girls",
		count: 53,
		fill: "#FAE27C"
	},
	{
		name: "Boys",
		count: 53,
		fill: "#C3EBFA"
	}
];

const CountChart = () => {
	return (
		<div className=" bg-white rounded-xl w-full h-full p-4">
			{/* Title chart */}
			<div className="flex justify-between items-center">
				<h1 className="text-lg font-semibold">Students</h1>
				<Image
					src="/moreDark.png"
					alt="Chart"
					width={20}
					height={20}
					className="cursor-pointer"
				/>
			</div>

			{/* Chart */}

			<div className="w-full h-[75%] relative">
				<ResponsiveContainer>
					<RadialBarChart
						cx="50%"
						cy="50%"
						innerRadius="40%"
						outerRadius="100%"
						barSize={32}
						data={data}
					>
						<RadialBar background dataKey="count" />
					</RadialBarChart>
				</ResponsiveContainer>
				{/* Icons images */}
				<Image
					src="/maleFemale.png"
					alt="Chart"
					width={35}
					height={35}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				/>
			</div>

			{/* Bottom */}
			<div className="flex justify-center gap-16">
				<div className="flex flex-col gap-1">
					<div className="w-5 h-5 bg-alexSky rounded-full" />
					<h1 className="font-bold">1,234</h1>
					<h2 className="text-sm text-gray-300">Boys (55%)</h2>
				</div>
				<div className="flex flex-col gap-1">
					<div className="w-5 h-5 bg-alexYellow rounded-full" />
					<h1 className="font-bold">1,234</h1>
					<h2 className="text-sm text-gray-300">Girls (25%)</h2>
				</div>
			</div>
		</div>
	);
};

export default CountChart;