"use client";

import Image from "next/image";
import React, { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

const FormModal = ({
	table,
	type,
	id,
	data
}: {
	table:
		| "teacher"
		| "student"
		| "parent"
		| "subject"
		| "class"
		| "lesson"
		| "exam"
		| "assignment"
		| "results"
		| "event"
		| "announcement";
	type: "create" | "update" | "delete";
	id?: number;
	data?: any;
}) => {
	const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
	const bgColor =
		type === "create"
			? "bg-alexYellow"
			: type === "update"
			? "bg-alexSky"
			: "bg-alexPurple";

	const [open, setOpen] = useState(false);

	const Form = () => {
		return type === "delete" && id ? (
			<form action="" className="p-4 flex flex-col gap-4">
				<span className="text-center font-medium">
					Are you sure you want to delete this {table}?
				</span>
				<button className="bg-red-500 text-white py-2 px-4 rounded-md border-none hover:bg-red-600 transition-colors md:w-fit self-center">
					Delete
				</button>
			</form>
		) : (
			// <TeacherForm type="create" data={data} />?
			<TeacherForm type="update" data={data} />
		);
	};

	return (
		<>
			<button
				className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
				onClick={() => setOpen(true)}
			>
				<Image src={`/${type}.png`} alt="Plus" width={16} height={16} />
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
