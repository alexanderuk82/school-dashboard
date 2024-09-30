import React from "react";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
	return (
		<main className="p-4 flex gap-4 flex-col md:flex-row">
			{/* Middle content */}
			<aside className=" w-full lg:w-2/3">
				{/* User Card */}

				<div className="flex  gap-4 justify-center md:justify-between">
					<UserCard rolUser="Alexander" />
					<UserCard rolUser="Teacher" />
					<UserCard rolUser="Parent" />
					<UserCard rolUser="Staff" />
				</div>
			</aside>
			{/* Right content */}
			<aside className=" w-full lg:w-1/3">right side</aside>
		</main>
	);
};

export default AdminPage;
