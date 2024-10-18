"use client";

import Image from "next/image";
import React, { useState } from "react";

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
					<div className="p-4 bg-white rounded-xl">
						<p>{type === "delete" && `delete this ${table}`}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default FormModal;
