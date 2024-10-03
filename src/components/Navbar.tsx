import Image from "next/image";
import React from "react";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between p-4">
			{/* Search Bar */}
			<div className="hidden md:flex items-center gap-4 text-sm rounded-full ring-[1.5px] ring-gray-300 p-2 cursor-pointer">
				<Image src="/search.png" alt="Search" width={14} height={14} />
				<input
					type="text"
					placeholder="Search..."
					className="focus:outline-none cursor-pointer w-[200px] bg-transparent"
				/>
			</div>

			{/* icons AND user info */}

			<div className=" flex items-center gap-6 justify-end w-full">
				{/* Icons notification */}

				<div className="flex bg-white rounded-full items-center justify-center w-7 h-7 cursor-pointer">
					<Image src="/message.png" alt="User" width={20} height={20} />
				</div>
				<div className="flex bg-white rounded-full items-center justify-center w-7 h-7 cursor-pointer relative">
					<Image src="/announcement.png" alt="User" width={20} height={20} />
					<span className="absolute -top-3  -right-3 text-xs leading-3 text-white bg-red-500 rounded-full px-2 py-1 font-medium">
						5
					</span>
				</div>
				{/* User name */}

				<div className="flex flex-col">
					<span className="text-sm leading-3 font-medium">Alexander</span>
					<span className="text-xs leading-3 text-gray-500 text-right">
						Admin
					</span>
				</div>

				{/* User avatar */}
				<Image
					src="/avatar.png"
					alt="User"
					width={36}
					height={36}
					className="rounded-full"
				/>
			</div>
		</div>
	);
};

export default Navbar;
