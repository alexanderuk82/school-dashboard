"use client";
import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

// Announcement interface
interface Announcement {
	id: number;
	title: string;
	date: Date | string; // Allow both Date and string
	description: string;
}

const Announcements = () => {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);

	// Fetching the announcements.json
	useEffect(() => {
		fetch("/json/announcements.json")
			.then((response) => response.json())
			.then((data) => {
				const today = new Date();

				// Parse dates, filter upcoming, sort by date, and slice the first 3
				const upcomingAnnouncements = data.announcements
					.map((announcement: Announcement) => ({
						...announcement,
						date: new Date(announcement.date) // Convert date string to Date object
					}))
					.filter(
						(announcement: Announcement) => (announcement.date as Date) >= today
					) // Only future announcements
					.sort(
						(a: Announcement, b: Announcement) =>
							(a.date as Date).getTime() - (b.date as Date).getTime()
					) // Sort by date
					.slice(0, 3); // Get the next 3 upcoming

				setAnnouncements(upcomingAnnouncements);
			})
			.catch((error) => console.error("Error fetching announcements:", error));
	}, []);

	// Define the background colors based on index
	const bgColors = [
		"bg-alexSkyLight",
		"bg-alexPurpleLight",
		"bg-alexYellowLight"
	];

	return (
		<div className="bg-white rounded-md p-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Announcements</h1>
				<span className="text-xs text-gray-500 cursor-pointer">View all</span>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				{announcements.length > 0 ? (
					announcements.map((announcement, index) => (
						<div
							key={announcement.id}
							// Apply different background colors based on index
							className={`${
								bgColors[index % bgColors.length]
							} rounded-md p-4 cursor-pointer`}
						>
							<h2 className="font-medium">{announcement.title}</h2>
							<p className="text-sm text-gray-500">
								{announcement.description}
							</p>

							<p className="flex items-center gap-1 text-xs font-semibold text-gray-500 mt-2 p-2 bg-white rounded-full w-fit">
								<FaRegCalendarAlt />
								{/* Format date to display */}
								{(announcement.date as Date).toLocaleDateString()}{" "}
								{/* Casting date */}
							</p>
						</div>
					))
				) : (
					<p className="text-gray-500">No upcoming announcements available.</p>
				)}
			</div>
		</div>
	);
};

export default Announcements;
