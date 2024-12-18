"use client";

import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import React from "react";
import Table from "@/components/Table";
import Link from "next/link";
import { parentsData, role } from "@/app/lib/data";
import FormModal from "@/components/FormModal";

type Parent = {
	id: number;
	name: string;
	email?: string;
	students: string[];
	phone?: string;
	address: string;
};

const columns = [
	{
		header: "Info",
		accessor: "info"
	},
	{
		header: "Student Name",
		accessor: "students",
		className: "hidden md:table-cell"
	},

	{
		header: "Phone",
		accessor: "phone",
		className: "hidden lg:table-cell"
	},
	{
		header: "Address",
		accessor: "address",
		className: "hidden lg:table-cell"
	},
	{
		header: "Actions",
		accessor: "action"
	}
];

// Rendering rows

const ParentsListPage = () => {
	const renderRow = (item: Parent) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-alexPurpleLight"
		>
			<td className="flex items-center gap-4 p-4">
				<div className="flex flex-col">
					<h3 className="font-semibold">{item.name}</h3>
					<p className="text-xs text-gray-500">{item?.email}</p>
				</div>
			</td>
			<td className="hidden md:table-cell">{item.students.join(",")}</td>
			<td className="hidden md:table-cell">{item.phone}</td>
			<td className="hidden md:table-cell">{item.address}</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormModal table="parent" type="update" data={item} />
							<FormModal table="parent" type="delete" id={item.id} />
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
				<h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
						{role === "admin" && <FormModal table="parent" type="create" />}
					</div>
				</div>
			</div>
			{/* List section */}

			<Table columns={columns} renderRow={renderRow} data={parentsData} />

			{/* Pagination section */}
			<Pagination />
		</div>
	);
};

export default ParentsListPage;
