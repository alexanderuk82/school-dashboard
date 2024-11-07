// components/Table.tsx
"use client";

import React from "react";

interface TableProps {
	columns: { header: string; accessor: string; className?: string }[];
	data?: any[]; // `data` es opcional porque en algunos casos usaremos `children` en lugar de `data`
	renderRow?: (item: any) => React.ReactNode; // `renderRow` es opcional
	children?: React.ReactNode; // `children` es opcional para los casos donde no se usa `renderRow`
}

const Table: React.FC<TableProps> = ({
	columns,
	data,
	renderRow,
	children
}) => {
	return (
		<table className="w-full mt-4">
			<thead>
				<tr className="text-left text-gray-500 text-sm">
					{columns.map((col) => (
						<th key={col.accessor} className={col.className}>
							{col.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{renderRow && data ? data.map((item) => renderRow(item)) : children}
			</tbody>
		</table>
	);
};

export default Table;
