// "use client";

// import TableSearch from "@/components/TableSearch";
// import Pagination from "@/components/Pagination";
// import Image from "next/image";
// import React from "react";
// import Table from "@/components/Table";
// import Link from "next/link";
// import { role, studentsData } from "@/app/lib/data";
// import FormModal from "@/components/FormModal";

// type Student = {
// 	id: number;
// 	studentId: string;
// 	name: string;
// 	email?: string;
// 	photo?: string;
// 	phone?: string;
// 	grade: number;
// 	class: string;
// 	address: string;
// };

// const columns = [
// 	{
// 		header: "Info",
// 		accessor: "info"
// 	},
// 	{
// 		header: "Student ID",
// 		accessor: "studentId",
// 		className: "hidden md:table-cell"
// 	},
// 	{
// 		header: "Grade",
// 		accessor: "grade",
// 		className: "hidden md:table-cell"
// 	},

// 	{
// 		header: "Phone",
// 		accessor: "phone",
// 		className: "hidden lg:table-cell"
// 	},
// 	{
// 		header: "Address",
// 		accessor: "address",
// 		className: "hidden lg:table-cell"
// 	},
// 	{
// 		header: "Actions",
// 		accessor: "action"
// 	}
// ];

// // Rendering rows

// const StudentListPage = () => {
// 	const renderRow = (item: Student) => (
// 		<tr
// 			key={item.id}
// 			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-alexPurpleLight"
// 		>
// 			<td className="flex items-center gap-4 p-4">
// 				<Image
// 					src={item.photo}
// 					alt=""
// 					width={40}
// 					height={40}
// 					className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
// 				/>
// 				<div className="flex flex-col">
// 					<h3 className="font-semibold">{item.name}</h3>
// 					<p className="text-xs text-gray-500">{item?.class}</p>
// 				</div>
// 			</td>
// 			<td className="hidden md:table-cell">{item.studentId}</td>
// 			<td className="hidden md:table-cell">{item.grade}</td>
// 			<td className="hidden md:table-cell">{item.phone}</td>
// 			<td className="hidden md:table-cell">{item.address}</td>
// 			<td>
// 				<div className="flex items-center gap-2">
// 					<Link href={`/list/students/${item.id}`}>
// 						<button className="w-7 h-7 flex items-center justify-center rounded-full bg-alexSky">
// 							<Image src="/view.png" alt="" width={16} height={16} />
// 						</button>
// 					</Link>
// 					{role === "admin" && (
// 						<FormModal table="student" type="delete" id={item.id} />
// 					)}
// 				</div>
// 			</td>
// 		</tr>
// 	);
// 	return (
// 		<div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
// 			{/* Top section */}
// 			<div className="flex items-center justify-between">
// 				<h1 className="hidden md:block text-lg font-semibold">All Students</h1>
// 				{/* Search and Buttons */}
// 				<div className=" flex flex-col md:flex-row items-center w-full md:w-auto gap-4">
// 					<TableSearch />

// 					{/* Buttons filter */}
// 					<div className="flex gap-4 items-center self-end">
// 						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
// 							<Image src="/filter.png" alt="Filter" width={14} height={14} />
// 						</button>
// 						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
// 							<Image src="/sort.png" alt="Filter" width={14} height={14} />
// 						</button>
// 						{role === "admin" && <FormModal table="student" type="create" />}
// 					</div>
// 				</div>
// 			</div>
// 			{/* List section */}

// 			<Table columns={columns} renderRow={renderRow} data={studentsData} />

// 			{/* Pagination section */}
// 			<Pagination />
// 		</div>
// 	);
// };

// export default StudentListPage;

// components/StudentListPage.tsx

import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import React from "react";
import Table from "@/components/Table";
import GenericTableRow from "@/components/GenericTableRow";
import FormModal from "@/components/FormModal";
import prisma from "@/app/lib/prisma";
import Image from "next/image";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { Prisma } from "@prisma/client";

const role = "admin";

const StudentListPage = async ({
	searchParams
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	console.log(searchParams);

	// Parse the search parameters
	const { page, ...queryParams } = searchParams;

	// Parse the page number
	const p = page ? parseInt(page as string) : 1;

	// Define the search query for Student based on queryParams
	const query: Prisma.StudentWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "teacherId": {
						query.class = { lessons: { some: { teacherId: value } } };
						break;
					}
					case "search": {
						query.name = {
							contains: value,
							mode: "insensitive"
						};
						break;
					}
				}
			}
		}
	}

	const columns = [
		{ header: "Info", accessor: "info" },
		{ header: "Student ID", accessor: "username" },
		{ header: "Grade", accessor: "grade.level" },
		{ header: "Class", accessor: "class.name" },
		{ header: "Phone", accessor: "phone" },
		{ header: "Address", accessor: "address" }
	];

	// Fetch data and count from Prisma with pagination
	const [data, count] = await prisma.$transaction([
		prisma.student.findMany({
			where: query,
			include: {
				class: true,
				grade: true
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1)
		}),
		prisma.student.count({ where: query })
	]);

	const adminActions = role === "admin";

	return (
		<div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
			{/* Top section */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Students</h1>
				<div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
					<TableSearch />
					<div className="flex items-center gap-4 self-end">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
							<Image src="/filter.png" alt="Filter" width={14} height={14} />
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
							<Image src="/sort.png" alt="Sort" width={14} height={14} />
						</button>
						{role === "admin" && <FormModal table="student" type="create" />}
					</div>
				</div>
			</div>

			{/* Table section */}
			<Table columns={columns}>
				{data.map((item) => (
					<GenericTableRow
						key={item.id}
						item={item}
						columns={columns}
						tableType="Student"
						adminActions={adminActions}
					/>
				))}
			</Table>

			{/* Pagination section */}
			<Pagination page={p} count={count} />
		</div>
	);
};

export default StudentListPage;
