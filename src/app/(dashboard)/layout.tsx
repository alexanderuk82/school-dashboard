import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="h-screen flex">
			{/* Left Sidebar */}
			<aside className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
				{/* Logo */}

				<Link href="/" className="flex items-center gap-2 font-bold text-2xl">
					<Image src="/logo.png" alt="Logo" width={32} height={32} />
					<span className="hidden lg:flex">SchoolUI</span>
				</Link>

				{/* Sidebar Menu */}

				<Menu />
			</aside>
			{/* Middle Content */}
			<section className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll">
				<Navbar />
				{children}
			</section>
		</section>
	);
}
