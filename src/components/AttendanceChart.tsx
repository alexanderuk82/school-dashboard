"use client";

import Image from "next/image";
import React from "react";

import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";

const data = [
	{
		name: "Mon",
		present: 50,
		absent: 10
	},
	{
		name: "Tue",
		present: 45,
		absent: 5
	},
	{
		name: "Wed",
		present: 60,
		absent: 10
	},
	{
		name: "Thu",
		present: 20,
		absent: 2
	},
	{
		name: "Fri",
		present: 45,
		absent: 10
	}
];

const AttendanceChart = () => {
	return (
		<div className="bg-white rounded-xl w-full h-full p-4">
			{/* Title chart */}
			<div className="flex justify-between items-center">
				<h1 className="text-lg font-semibold">Attendance</h1>
				<Image src="/moreDark.png" alt="Chart" width={20} height={20} />
			</div>

			{/* Chart */}

			<ResponsiveContainer width="100%" height="90%">
				<BarChart width={500} height={300} data={data} barSize={20}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
					<XAxis
						dataKey="name"
						axisLine={false}
						tick={{ fill: "#d1d5db" }}
						tickLine={false}
					/>
					<YAxis tickLine={false} axisLine={false} tick={{ fill: "#7a7a7b" }} />
					<Tooltip
						contentStyle={{
							borderRadius: "10px",
							borderColor: "#c0c0c0"
						}}
					/>
					<Legend
						align="left"
						verticalAlign="top"
						wrapperStyle={{
							paddingTop: "20px",
							paddingBottom: "40px"
						}}
					/>
					<Bar
						dataKey="present"
						fill="#C3EBFA"
						legendType="circle"
						radius={[10, 10, 0, 0]}
					/>
					<Bar
						dataKey="absent"
						fill="#FAE27C"
						legendType="circle"
						radius={[10, 10, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default AttendanceChart;
