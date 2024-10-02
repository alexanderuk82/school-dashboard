import Image from "next/image";
import React from "react";

const UserCard = ({ rolUser }: { rolUser: string }) => {
	return (
		<div className="rounded-2xl odd:bg-alexPurple even:bg-alexYellow p-4 flex-1 flex flex-col gap-2 justify-center">
			<div className="flex justify-between items-center">
				<span className="text-xs px-2 py-1 rounded-full bg-alexSkyLight">
					2024/25
				</span>
				<Image src="/more.png" alt="User" width={20} height={20} />
			</div>
			<h1 className="text-2xl font-semibold">1,235</h1>
			<h2 className=" text-sm font-medium text-gray-500">{rolUser}s</h2>
		</div>
	);
};

export default UserCard;
