"use client";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { useRouter } from "next/navigation";
import React from "react";

function Pagination({ page, count }: { page: number; count: number }) {
	// Get the current page from the URL
	const router = useRouter();

	// Handle page change
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set("page", page.toString());
		router.push(`${window.location.pathname}?${params.toString()}`);
	};

	return (
		<div className="p-4 flex items-center justify-between text-gray-500">
			{/* Button back */}
			<button
				disabled={page <= 1}
				className="py-2 px-4 rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={() => handlePageChange(page - 1)}
			>
				prev
			</button>

			{/* Number of pages */}
			<div className="flex items-center gap-2">
				{Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (x, i) => {
					const currentPage = i + 1;
					const isActive = currentPage === page;

					return (
						<button
							key={i}
							className={`px-2 rounded-sm ${
								isActive ? "bg-alexSky" : "bg-slate-200"
							}`}
							onClick={() => handlePageChange(currentPage)}
						>
							{currentPage}
						</button>
					);
				})}
			</div>

			{/* Button Next */}
			<button
				className="py-2 px-4 rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
				onClick={() => handlePageChange(page + 1)}
				disabled={page >= Math.ceil(count / ITEM_PER_PAGE)}
			>
				next
			</button>
		</div>
	);
}

export default Pagination;
