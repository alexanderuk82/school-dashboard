"use client";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import React from "react";

const ParentsPage = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
			{/* LEFTside */}

			<aside className="w-full lg:w-2/3">
				<div className="h-full bg-white p-4 rounded-md">
					<h1 className="text-xl font-semibold">Schedule</h1>
					<BigCalendar />
				</div>
			</aside>

			{/* RIGHTside */}
			<aside className=" w-full lg:w-1/3 flex flex-col gap-8">
				{/* Announcements */}

				<Announcements />
			</aside>
		</main>
	);
};

export default ParentsPage;
