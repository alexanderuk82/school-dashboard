"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long" })
		.max(20, { message: "Username must be at most 20 characters long" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
	firstName: z
		.string()
		.min(2, { message: "First name must be at least 2 characters long" }),
	lastName: z
		.string()
		.min(2, { message: "Last name must be at least 2 characters long" }),
	phone: z.string().min(2, { message: "The phone is required" }),
	address: z.string().min(2, { message: "First address is required" }),
	birthday: z.date({ message: "Birthday is required" }),
	sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
	img: z.instanceof(File, { message: "Image is required" })
});

const TeacherForm = ({
	type,
	data
}: {
	type: "create" | "update";
	data: any;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<form className="p-4 flex flex-col gap-4" onSubmit={onSubmit}>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create a new teacher" : "Update teacher"}
			</h1>
			<span className="text-xs text-gray-400 font-medium">
				Authentication Information
			</span>
			<input
				{...register("username")}
				type="text"
				placeholder="Username"
				className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
			/>
			{errors.username?.message && <p>{errors.username?.message.toString()}</p>}
			<span className="text-xs text-gray-400 font-medium">
				Personal Information
			</span>

			<button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default TeacherForm;
