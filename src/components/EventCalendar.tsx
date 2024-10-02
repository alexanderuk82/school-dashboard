"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import React from "react";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// Event interface
interface Event {
	id: number;
	title: string;
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
			.then((data) => setEvents(data.events))
			.catch((error) => console.error("Error fetching events:", error));
	}, []);

	return (
		<div className="bg-white rounded-md p-4">
			<Calendar onChange={onChange} value={value} />

			<div className="flex flex-col gap-4 mt-6">
				{/* Inserting events here */}
				<h3 className="text-xl font-bold">Upcoming Events</h3>
				{events.length > 0 ? (
					events.map((event) => (
						<div
							key={event.id}
							className="p-4 border border-gray-200 rounded-lg shadow-sm"
						>
							<h4 className="font-semibold text-lg">{event.title}</h4>
							<p className="text-sm text-gray-500">{event.time}</p>
							<p className="text-sm">{event.description}</p>
						</div>
					))
				) : (
					<p className="text-gray-500">No events available.</p>
				)}
			</div>
		</div>
	);
};

export default EventCalendar;
