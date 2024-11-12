// components/TeacherListPage.tsx

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

const TeacherListPage = async ({
	searchParams
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	console.log(searchParams);

	// Parse the search parameters
	const { page, ...queryParams } = searchParams;

	// Parse the page number
	const p = page ? parseInt(page as string) : 1;

	// URL parameters for the search CONDITION

	const query: Prisma.TeacherWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				// Fixed the condition
				switch (key) {
					case "classId": {
						query.lessons = {
							some: {
								classId: parseInt(value)
							}
						};
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
		{ header: "Username", accessor: "username" },
		{ header: "Subjects", accessor: "subjects" },
		{ header: "Classes", accessor: "classes" },
		{ header: "Phone", accessor: "phone" },
		{ header: "Address", accessor: "address" }
	];

	const [data, count] = await prisma.$transaction([
		prisma.teacher.findMany({
			where: query,
			include: {
				subjects: true,
				classes: true
			},
			// Pagination
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1)
		}),
		// Count the total number of records
		prisma.teacher.count({ where: query })
	]);

	const adminActions = role === "admin";

	return (
		<div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
				<div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
					<TableSearch />
					<div className="flex items-center gap-4 self-end">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="Filter" width={14} height={14} />
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="Sort" width={14} height={14} />
						</button>
						{role === "admin" && <FormModal table="teacher" type="create" />}
					</div>
				</div>
			</div>
			<Table columns={columns}>
				{data.map((item) => (
					<GenericTableRow
						key={item.id}
						item={item}
						columns={columns}
						tableType="Teacher"
						adminActions={adminActions}
					/>
				))}
			</Table>
			<Pagination page={p} count={count} />
		</div>
	);
};

export default TeacherListPage;
