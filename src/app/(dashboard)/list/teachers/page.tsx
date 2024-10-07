import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";

const TeacherListPage = () => {
	return (
		<div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
			{/* Top section */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-alexYellow">
							<Image src="/plus.png" alt="Filter" width={14} height={14} />
						</button>
					</div>
				</div>
			</div>
			{/* List section */}
			<div className=""></div>
			{/* Pagination section */}
			<div className=""></div>
		</div>
	);
};

export default TeacherListPage;
