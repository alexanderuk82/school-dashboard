import React from "react";

function Pagination() {
	return (
		<div className="p-4 flex items-center justify-between text-gray-500">
			{/* Button back */}
			<button
				disabled
				className="py-2 px-4 rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 cursor-not-allowed"
			>
				prev
			</button>

			{/* Number of pages */}
			<div className="flex items-center gap-2">
				<button className="px-2 rounded-sm bg-alexSky">1</button>
				<button className="px-2 rounded-sm ">2</button>
				<button className="px-2 rounded-sm ">3</button>
				...
				<button className="px-2 rounded-sm ">10</button>
			</div>

			{/* Button Next */}
			<button className="py-2 px-4 rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 cursor-pointer">
				next
			</button>
		</div>
	);
}

export default Pagination;
