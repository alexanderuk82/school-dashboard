"use client";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleTeacherPage = () => {
	return (
		<div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
			{/* LEFTside */}
			<aside className="w-full lg:w-[100%]">
				{/* TOP section */}

				<div className="flex flex-col gap-4 lg:flex-row">
					{/* Card */}
					<div className="bg-alexSky py-6 px-4 rounded-md flex-1  flex flex-col md:flex-row md:justify-around  gap-4 items-center md:items-start w-full">
						{/* Image */}
						<div className="w-1/2 md:w-1/6 lg:w-1/2">
							<Image
								src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
								alt=""
								width={144}
								height={144}
								className="aspect-square rounded-full w-full object-cover"
							/>
						</div>
						{/* Information */}
						<div className="m d:w-2/3 flex flex-col justify-between gap-4 w-full ">
							<h1 className="text-2xl  font-semibold">Alexander</h1>
							<p className="text-xs md:text-base text-gray-500">
								Alex is a dedicated mathematics teacher with over 10 years of
								experience in high school education.{" "}
							</p>
							<div className="flex xs:flex-col  items-center gap-2 justify-between flex-wrap text-xs font-medium sm:flex-row sm:w-full md:text-xs">
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image src="/blood.png" alt="Blood" width={14} height={14} />
									<span>A+</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image src="/date.png" alt="Blood" width={14} height={14} />
									<span>January 2025</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image src="/mail.png" alt="Blood" width={14} height={14} />
									<span>alex@mail.com</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image src="/phone.png" alt="Blood" width={14} height={14} />
									<span>07554624521</span>
								</div>
							</div>
						</div>
					</div>

					{/* Small cards Information*/}

					<div className=" flex-1 flex gap-4 justify-between flex-wrap">
						{/* Items card */}
						<div className="bg-white p-4 rounded flex lg:flex-col gap-4 w-full md:w-[47%]  2xl:w-[48%]">
							<Image
								src="/singleAttendance.png"
								alt="attendance"
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">90%</h1>
								<span className="text-sm text-gray-500">Attendance</span>
							</div>
						</div>
						{/* Items card */}
						<div className="bg-white p-4 rounded flex lg:flex-col gap-4 w-full md:w-[47%]  2xl:w-[48%]">
							<Image
								src="/singleBranch.png"
								alt="attendance"
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">2</h1>
								<span className="text-sm text-gray-500">Branches</span>
							</div>
						</div>
						{/* Items card */}
						<div className="bg-white p-4 rounded flex lg:flex-col gap-4 w-full md:w-[47%]  2xl:w-[48%]">
							<Image
								src="/singleLesson.png"
								alt="attendance"
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">6</h1>
								<span className="text-sm text-gray-500">Lessons</span>
							</div>
						</div>
						{/* Items card */}
						<div className="bg-white p-4 rounded flex lg:flex-col gap-4 w-full md:w-[47%]  2xl:w-[48%]">
							<Image
								src="/singleClass.png"
								alt="attendance"
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">6</h1>
								<span className="text-sm text-gray-500">Classes</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom section CALENDAR */}

				<div className="mt-4 bg-white rounded-md p-4 h-[800px]">
					<h1>Teacher's Schedule</h1>
					<BigCalendar />
				</div>
			</aside>

			{/* RIGHTside */}
			<aside className=" w-full xl:w-5/12 flex flex-col gap-4">
				{/* Shortcut Links */}
				<div className="bg-white p-4 rounded-md">
					<h1 className="text-xl font-semibold">Shortcuts</h1>
					<div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500">
						<Link className="p-3 rounded-md bg-alexSkyLight " href="/">
							Teacher's Classes
						</Link>
						<Link className="p-3 rounded-md bg-alexPurpleLight " href="/">
							Teacher's Students
						</Link>
						<Link className="p-3 rounded-md bg-alexYellowLight " href="/">
							Teacher's Lessons
						</Link>
						<Link className="p-3 rounded-md bg-pink-50" href="/">
							Teacher's Exams
						</Link>
						<Link className="p-3 rounded-md bg-alexSkyLight " href="/">
							Teacher's Assignments
						</Link>
					</div>
				</div>

				{/* Charts graph */}

				<Performance />

				{/* Announcements */}
				<Announcements />
			</aside>
		</div>
	);
};

export default SingleTeacherPage;
