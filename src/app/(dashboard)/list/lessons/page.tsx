"use client";

import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import React from "react";
import Table from "@/components/Table";
import Link from "next/link";
import { lessonsData, role } from "@/app/lib/data";
import FormModal from "@/components/FormModal";

type Lesson = {
	id: number;
	subject: string;
	class: string;
	teacher: string;
};

const columns = [
	{
		header: "Subject Name",
		accessor: "name"
	},
	{
		header: "Class",
		accessor: "class"
	},

	{
		header: "Teacher",
		accessor: "teacher",
		className: "hidden md:table-cell"
	},

	{
		header: "Actions",
		accessor: "action"
	}
];

// Rendering rows

const LessonListPage = () => {
	const renderRow = (item: Lesson) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-alexPurpleLight"
		>
			<td className="flex items-center gap-4 p-4">{item.subject}</td>
			<td>{item.class}</td>
			<td className="hidden md:table-cell">{item.teacher}</td>

			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormModal table="lesson" type="update" data={item} />
							<FormModal table="lesson" type="delete" id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	);
	return (
		<div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
			{/* Top section */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
				{/* Search and Buttons */}
				<div className=" flex flex-col md:flex-row items-center w-full md:w-auto gap-4">
					<TableSearch />

					{/* Buttons filter */}
					<div className="flex gap-4 items-center self-end">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
							<Image src="/filter.png" alt="Filter" width={14} height={14} />
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
							<Image src="/sort.png" alt="Filter" width={14} height={14} />
						</button>
						{role === "admin" && <FormModal table="lesson" type="create" />}
					</div>
				</div>
			</div>
			{/* List section */}

			<Table columns={columns} renderRow={renderRow} data={lessonsData} />

			{/* Pagination section */}
			<Pagination />
		</div>
	);
};

export default LessonListPage;