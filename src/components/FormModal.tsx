"use client";

import Image from "next/image";
import React, { useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

// Lazy Loading Next JS New options to import components

import dynamic from "next/dynamic";
import ParentForm from "./forms/ParentForm";
import SubjectForm from "./forms/SubjectForm";
import ClassForm from "./forms/ClassForm";
import LessonForm from "./forms/LessonForm";
import ExamForm from "./forms/ExamForm";
import AssignmentForm from "./forms/AssignmentForm";
import ResultForm from "./forms/ResultForm";
import EventForm from "./forms/EventForm";
import AnnouncementForm from "./forms/AnnouncementForm";
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
	loading: () => (
		<h1 className="flex items-center justify-center h-full w-full">
			Loading...
		</h1>
	)
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
	loading: () => (
		<h1 className="flex items-center justify-center h-full w-full">
			Loading...
		</h1>
	)
});

const forms: {
	[key: string]: (type: "create" | "update", data: any) => JSX.Element;
} = {
	teacher: (type, data) => <TeacherForm type={type} data={data} />,
	student: (type, data) => <StudentForm type={type} data={data} />,
	parent: (type, data) => <ParentForm type={type} data={data} />,
	subject: (type, data) => <SubjectForm type={type} data={data} />,
	class: (type, data) => <ClassForm type={type} data={data} />,
	lesson: (type, data) => <LessonForm type={type} data={data} />,
	exam: (type, data) => <ExamForm type={type} data={data} />,
	assignment: (type, data) => <AssignmentForm type={type} data={data} />,
	result: (type, data) => <ResultForm type={type} data={data} />,
	event: (type, data) => <EventForm type={type} data={data} />,
	announcement: (type, data) => <AnnouncementForm type={type} data={data} />
};

const FormModal = ({
	table,
	type,
	id,
	data
}: {
	table: keyof typeof forms; // Dynamically get the keys of `forms` as valid values
	type: "create" | "update" | "delete";
	id?: number;
	data?: any;
}) => {
	const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

	const getButtonColor = (type: "create" | "update" | "delete") => {
		switch (type) {
			case "create":
				return "bg-alexYellow";
			case "update":
				return "bg-alexSky";
			case "delete":
				return "bg-alexPurple";
			default:
				return "";
		}
	};

	const [open, setOpen] = useState(false);

	const Form = () => {
		if (type === "delete" && id) {
			return (
				<form action="" className="p-4 flex flex-col gap-4">
					<span className="text-center font-medium">
						Are you sure you want to delete this {table}?
					</span>
					<button className="bg-red-500 text-white py-2 px-4 rounded-md border-none hover:bg-red-600 transition-colors md:w-fit self-center">
						Delete
					</button>
				</form>
			);
		}

		if (type === "create" || type === "update") {
			const FormComponent = forms[table];
			return FormComponent ? FormComponent(type, data) : <p>Form not found</p>;
		}

		return <p>Form not found</p>;
	};

	return (
		<>
			<button
				className={`${size} flex items-center justify-center rounded-full ${getButtonColor(
					type
				)}`}
				onClick={() => setOpen(true)}
			>
				<Image src={`/${type}.png`} alt="Button Icon" width={16} height={16} />
			</button>

			{open && (
				<div
					className="w-screen h-screen absolute  left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center
                "
				>
					<div className="p-6 bg-white rounded-xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
						<Form />
						<div
							className="absolute top-4 right-4 cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<Image src="/close.png" alt="Close" width={14} height={14} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FormModal;
