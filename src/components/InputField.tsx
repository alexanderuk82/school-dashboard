import React from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
	type?: string;
	label: string;
	register: any;
	name: string;
	defaultValue?: string;
	placeholder?: string;
	error?: FieldError;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
	type = "text",
	label,
	register,
	name,
	defaultValue,
	placeholder,
	error,
	inputProps
}: InputFieldProps) => {
	return (
		<div className="flex flex-col gap-2 w-full md:w-1/4">
			<label className="text-xs text-gray-500">{label}</label>
			<input
				type={type}
				{...register(name)}
				placeholder={placeholder}
				className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
				{...inputProps}
				defaultValue={defaultValue}
			/>
			{error?.message && (
				<p className="text-red-600 text-sm">{error?.message.toString()}</p>
			)}
		</div>
	);
};

export default InputField;
