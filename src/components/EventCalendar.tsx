"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import React from "react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// Event interface
interface Event {
	id: number;
	title: string;
	date: Date; // Use Date type here since we are converting the date
	time: string;
	description: string;
}

const EventCalendar = () => {
	const [value, onChange] = useState<Value>(new Date());
	const [events, setEvents] = useState<Event[]>([]);

	// Fetching the events.json
	useEffect(() => {
		fetch("/json/events.json")
			.then((response) => response.json())
			.then((data) => {
				const today = new Date();

				// Parse the event dates and filter for upcoming events
				const upcomingEvents = data.events
					.map((event: Event) => ({
						...event,
						date: new Date(event.date) // Convert date string to Date object
					}))
					.filter((event: Event) => event.date >= today) // Only future events
					.sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime()) // Sort by date
					.slice(0, 3); // Get the next 3 events

				setEvents(upcomingEvents);
			})
			.catch((error) => console.error("Error fetching events:", error));
	}, []);

	return (
		<div className="bg-white rounded-md p-4">
			{/* Calendar section */}
			<Calendar onChange={onChange} value={value} />

			{/* Events section */}
			<div className="flex flex-col gap-4 mt-6">
				{/* Inserting events here */}
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">Upcoming Events</h3>
					<Image
						src="/moreDark.png"
						alt="More"
						width={20}
						height={20}
						className="cursor-pointer"
					/>
				</div>

				{events.length > 0 ? (
					events.map((event) => (
						<div
							key={event.id}
							className="p-4 border-2 border-gray-100 rounded-md border-t-4 odd:border-t-alexSky even:border-t-alexPurple cursor-pointer"
						>
							<div className="flex items-start justify-between">
								<h4 className="font-semibold text-lg text-gray-600">
									{event.title}
								</h4>
								<p className="text-xs text-gray-300">{event.time}</p>
							</div>
							<p className="text-sm text-gray-600">{event.description}</p>
							{/* Formatting the date for display */}
							<p className="flex items-center gap-1 text-xs font-semibold text-gray-800 mt-2 p-2 bg-alexYellow rounded-full w-fit">
								<FaRegCalendarAlt />
								{event.date.toLocaleDateString()} {/* Format Date here */}
							</p>
						</div>
					))
				) : (
					<p className="text-gray-500">No upcoming events available.</p>
				)}
			</div>
		</div>
	);
};

export default EventCalendar;
