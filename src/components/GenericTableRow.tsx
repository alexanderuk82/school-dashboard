// // components/GenericTableRow.tsx
// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import FormModal from "./FormModal";
// import { TableType } from "../app/lib/types"; // Import the TableType union

// interface ColumnConfig {
// 	header: string;
// 	accessor: string;
// 	className?: string;
// }

// interface GenericTableRowProps {
// 	item: Record<string, any>;
// 	columns: ColumnConfig[];
// 	tableType: TableType; // Use the new union type here
// 	adminActions?: boolean;
// }

// const GenericTableRow: React.FC<GenericTableRowProps> = ({
// 	item,
// 	columns,
// 	tableType,
// 	adminActions
// }) => {
// 	const renderCellContent = (accessor: string, item: any) => {
// 		switch (accessor) {
// 			case "info":
// 				return (
// 					<div className="flex items-center gap-4">
// 						<Image
// 							src={item.img || "/noAvatar.png"}
// 							alt={`${tableType} Avatar`}
// 							width={40}
// 							height={40}
// 							className="w-10 h-10 rounded-full object-cover"
// 						/>
// 						<div>
// 							<h3 className="font-semibold">{item.name}</h3>
// 							<p className="text-xs text-gray-500">{item.email}</p>
// 						</div>
// 					</div>
// 				);
// 			case "subjects":
// 				return item.subjects && item.subjects.length > 0
// 					? item.subjects.map((subject: any) => subject.name).join(", ")
// 					: "No Subjects";
// 			case "classes":
// 				return item.classes && item.classes.length > 0
// 					? item.classes.map((classItem: any) => classItem.name).join(", ")
// 					: "No Classes";
// 			default:
// 				return item[accessor] ?? "N/A";
// 		}
// 	};

// 	return (
// 		<tr className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-alexPurpleLight">
// 			{columns.map((column) => (
// 				<td key={column.accessor} className={column.className || "p-4"}>
// 					{renderCellContent(column.accessor, item)}
// 				</td>
// 			))}
// 			{adminActions && (
// 				<td>
// 					<div className="flex items-center gap-2">
// 						{/* <Link href={`/list/teachers/${item.id}`}> */}
// 						<Link href={`/list/${tableType.toLowerCase()}s/${item.id}`}>
// 							<button className="w-7 h-7 flex items-center justify-center rounded-full bg-alexSky">
// 								<Image src="/view.png" alt="View" width={16} height={16} />
// 							</button>
// 						</Link>
// 						<FormModal
// 							table={tableType.toLowerCase() as TableType} // Explicitly cast to `TableType`
// 							type="delete"
// 							id={item.id}
// 						/>
// 					</div>
// 				</td>
// 			)}
// 		</tr>
// 	);
// };

// export default GenericTableRow;
// components/GenericTableRow.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FormModal from "./FormModal";
import { TableType } from "../app/lib/types";

interface ColumnConfig {
	header: string;
	accessor: string;
	className?: string;
}

interface GenericTableRowProps {
	item: Record<string, any>;
	columns: ColumnConfig[];
	tableType: TableType;
	adminActions?: boolean;
}

const GenericTableRow: React.FC<GenericTableRowProps> = ({
	item,
	columns,
	tableType,
	adminActions
}) => {
	const renderCellContent = (accessor: string, item: any) => {
		const value = item[accessor];

		// Render image if the accessor is for an image or if the field contains an image URL
		if (
			accessor === "img" ||
			(typeof value === "string" && /\.(png|jpg|jpeg)$/i.test(value))
		) {
			return (
				<Image
					src={value || "/noAvatar.png"}
					alt={`${tableType} Avatar`}
					width={40}
					height={40}
					className="w-10 h-10 rounded-full object-cover"
				/>
			);
		}

		// Render a complex info section if accessor is "info" and item has specific fields like name and email
		if (accessor === "info" && item.name && item.email) {
			return (
				<div className="flex items-center gap-4">
					<Image
						src={item.img || "/noAvatar.png"}
						alt={`${tableType} Avatar`}
						width={40}
						height={40}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<h3 className="font-semibold">{item.name}</h3>
						<p className="text-xs text-gray-500">{item.email}</p>
					</div>
				</div>
			);
		}

		// Render array values by joining them, typically for relational fields like subjects or classes
		if (Array.isArray(value)) {
			return value.length > 0
				? value
						.map((subItem) => (subItem.name ? subItem.name : subItem))
						.join(", ")
				: `No ${accessor.charAt(0).toUpperCase() + accessor.slice(1)}`;
		}

		// Check if the value should be rendered as a link (e.g., ID fields or reference links)
		if (typeof value === "string" && /^\/list\//.test(value)) {
			return (
				<Link href={value}>
					<a className="text-blue-500 hover:underline">{value}</a>
				</Link>
			);
		}

		// Render simple values as text, or "N/A" if the value is null/undefined
		return value ?? "N/A";
	};

	return (
		<tr className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-alexPurpleLight">
			{columns.map((column) => (
				<td key={column.accessor} className={column.className || "p-4"}>
					{renderCellContent(column.accessor, item)}
				</td>
			))}
			{adminActions && (
				<td>
					<div className="flex items-center gap-2">
						<Link href={`/list/${tableType.toLowerCase()}s/${item.id}`}>
							<button className="w-7 h-7 flex items-center justify-center rounded-full bg-alexSky">
								<Image src="/view.png" alt="View" width={16} height={16} />
							</button>
						</Link>
						<FormModal
							table={tableType.toLowerCase() as TableType}
							type="delete"
							id={item.id}
						/>
					</div>
				</td>
			)}
		</tr>
	);
};

export default GenericTableRow;
