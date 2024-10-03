import React from "react";
import UserCard from "@/components/UserCard";
import CountChart from "@/components/CountChart";
import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";

const AdminPage = () => {
	return (
		<main className="p-4 flex gap-4 flex-col md:flex-row">
			{/* Middle content */}
			<aside className=" w-full lg:w-2/3 flex flex-col gap-8">
				{/* User Card */}

				<div className="flex  gap-4 justify-center md:justify-between flex-wrap">
					<UserCard rolUser="Alexander" />
					<UserCard rolUser="Teacher" />
					<UserCard rolUser="Parent" />
					<UserCard rolUser="Staff" />
				</div>

				{/* Chart section */}

				{/* First row chart */}
				<div className="flex flex-col gap-4 lg:flex-row">
					{/* Count chart */}
					<div className="w-full lg:w-1/3 h-[450px]">
						<CountChart />
					</div>

					{/* Attendance chart */}
					<div className="w-full lg:w-2/3 h-[450px]">
						<AttendanceChart />
					</div>
				</div>

				{/* Second row chart */}

				<div className="w-full h-[500px]">
					<FinanceChart />
				</div>
			</aside>
			{/* Right content */}
			<aside className=" w-full lg:w-1/3 flex flex-col gap-8">
				{/* Event calendar */}
				<EventCalendar />

				{/* Announcements */}

				<Announcements />
			</aside>
		</main>
	);
};

export default AdminPage;
