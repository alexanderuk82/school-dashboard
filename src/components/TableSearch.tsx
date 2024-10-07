import Image from "next/image";
import React from "react";

const TableSearch = () => {
	return (
		<>
			{/* Search Bar */}
			<div className="w-full md:w-auto flex items-center gap-4 text-sm rounded-full ring-[1.5px] ring-gray-300 p-2 cursor-pointer">
				<Image src="/search.png" alt="Search" width={14} height={14} />
				<input
					type="text"
					placeholder="Search..."
					className="focus:outline-none cursor-pointer w-[200px] bg-transparent"
				/>
			</div>
		</>
	);
};

export default TableSearch;
