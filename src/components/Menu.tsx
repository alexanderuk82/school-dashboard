"use client";

import { role } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface MenuItem {
	icon: string;
	label: string;
	href: string;
	visible: string[];
}

interface MenuSection {
	title: string;
	items: MenuItem[];
}

const Menu = () => {
	const [menuData, setMenuData] = useState<MenuSection[]>([]);

	useEffect(() => {
		// Fetch the menu-bar.json file
		fetch("/json/menu-bar.json")
			.then((response) => response.json())
			.then((data) => setMenuData(data.menuItems))
			.catch((error) => console.error("Error fetching menu:", error));
	}, []);

	return (
		<div className="flex flex-col gap-8 mt-6 ">
			{menuData.map((section, index) => (
				<div key={index}>
					<h3 className="hidden lg:block font-bold text-lg mb-2">
						{section.title}
					</h3>
					<ul className="flex flex-col gap-4">
						{section.items.map((item, i) => {
							if (item.visible.includes(role)) {
								return (
									<li key={i} className="w-full p-2 hover:bg-alexSkyLight">
										<Link
											href={item.href}
											className="flex items-center gap-2 text-gray-500 "
										>
											<Image
												src={item.icon}
												width={20}
												height={20}
												alt={item.label}
											/>{" "}
											<span className="hidden lg:flex">{item.label}</span>
										</Link>
									</li>
								);
							} else {
								return null;
							}
						})}
					</ul>
				</div>
			))}
		</div>
	);
};

export default Menu;
