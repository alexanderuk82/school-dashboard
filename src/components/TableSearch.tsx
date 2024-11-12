"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TableSearch = () => {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = (e.currentTarget[0] as HTMLInputElement).value;
		const params = new URLSearchParams(window.location.search);
		params.set("search", value);
		router.push(`${window.location.pathname}?${params.toString()}`);
	};

	return (
		<>
			{/* Search Bar */}
			<form
				onSubmit={handleSubmit}
				className="w-full md:w-auto flex items-center gap-4 text-sm rounded-full ring-[1.5px] ring-gray-300 p-2 cursor-pointer"
			>
				<Image src="/search.png" alt="Search" width={14} height={14} />
				<input
					type="text"
					placeholder="Search..."
					className="focus:outline-none cursor-pointer w-[200px] bg-transparent"
				/>
			</form>
		</>
	);
};

export default TableSearch;
