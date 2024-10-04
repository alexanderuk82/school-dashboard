import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/app/lib/data";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
	const [view, setView] = useState<View>(Views.WORK_WEEK);

	const handleViewChange = (view: View) => {
		setView(view);
	};

	return (
		<Calendar
			localizer={localizer}
			events={calendarEvents}
			startAccessor="start"
			endAccessor="end"
			views={["work_week", "day"]}
			view={view}
			style={{ height: 500 }}
			onView={handleViewChange}
		/>
	);
};

export default BigCalendar;
