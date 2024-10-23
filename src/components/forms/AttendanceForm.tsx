"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "../InputField";
import Image from "next/image";

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
	bloodType: z.string().min(2, { message: "Blood type is required" }),
	birthday: z.date({ message: "Birthday is required" }),
	sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
	img: z.instanceof(File, { message: "Image is required" })
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
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
	} = useForm<Inputs>({
		resolver: zodResolver(schema)
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<form className="p-4 flex flex-col gap-4" onSubmit={onSubmit}>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create a new student" : "Update Student"}
			</h1>
			{/* Input generate first row*/}
			<span className="text-xs text-gray-400 font-medium">
				Authentication Information
			</span>
			<div className="flex flex-col md:flex-row justify-between gap-6">
				<InputField
					type="text"
					label="Username"
					register={register}
					name="username"
					defaultValue={data?.username}
					placeholder="Username"
					error={errors?.username}
				/>
				<InputField
					type="email"
					label="Email"
					register={register}
					name="email"
					defaultValue={data?.email}
					placeholder="Email address"
					error={errors?.email}
				/>
				<InputField
					type="password"
					label="Password"
					register={register}
					name="password"
					defaultValue={data?.password}
					placeholder="Password"
					error={errors?.password}
				/>
			</div>
			{/* Input generate second row*/}
			<span className="text-xs text-gray-400 font-medium mt-3">
				Personal Information
			</span>
			<div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-6">
				<InputField
					type="text"
					label="First Name"
					register={register}
					name="firstName"
					defaultValue={data?.firstName}
					placeholder="firstName"
					error={errors?.firstName}
				/>
				<InputField
					type="text"
					label="Last Name"
					register={register}
					name="lastName"
					defaultValue={data?.lastName}
					placeholder="lastName"
					error={errors?.lastName}
				/>

				<InputField
					type="phone"
					label="Phone"
					register={register}
					name="phone"
					defaultValue={data?.phone}
					placeholder="phone"
					error={errors?.phone}
				/>
				<InputField
					type="text"
					label="Address"
					register={register}
					name="address"
					defaultValue={data?.address}
					placeholder="Email address"
					error={errors?.address}
				/>
				<InputField
					type="text"
					label="Blood Type"
					register={register}
					name="bloodType"
					defaultValue={data?.bloodType}
					placeholder="bloodType"
					error={errors?.bloodType}
				/>
				<InputField
					type="date"
					label="Birthday"
					register={register}
					name="birthday"
					defaultValue={data?.birthday}
					placeholder="birthday"
					error={errors?.birthday}
				/>

				{/* Input generate third row*/}

				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-500">Sex</label>
					<select
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
						{...register("sex")}
						defaultValue={data?.sex}
					>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>

					{errors?.sex?.message && (
						<p className="text-red-600 text-sm">
							{errors?.sex.message.toString()}
						</p>
					)}
				</div>

				{/* Upload image */}

				<div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
					<label
						className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
						htmlFor="img"
					>
						<Image src="/upload.png" alt="Upload" width={28} height={28} />
						<span> Upload a picture</span>
					</label>
					<input type="file" {...register("img")} className="hidden" id="img" />

					{errors?.img?.message && (
						<p className="text-red-600 text-sm">
							{errors?.img.message.toString()}
						</p>
					)}
				</div>
			</div>

			<button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default AttendanceForm;
