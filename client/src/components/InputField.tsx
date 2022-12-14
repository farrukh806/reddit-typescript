import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	textarea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
	label,
	size: _,
	textarea,
	...props
}) => {
	let Component = Input as any;
	if (textarea) {
		Component = Textarea;
	}
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Component
				{...field}
				{...props}
				id={field.name}
				placeholder={props.placeholder}
			/>
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
export default InputField;
