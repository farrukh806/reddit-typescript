import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { useMutation } from 'urql';

import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';

import REGISTER_MUTATION from '../GraphQL/registerMutation';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const [_, register] = useMutation(REGISTER_MUTATION);
	return (
		<Wrapper>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={(values) => {
					console.log(values);
					return register(values);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='username'
							placeholder='username'
							label='Username'
						/>
						<Box mt={8}>
							<InputField
								name='password'
								placeholder='password'
								type='password'
								label='Password'
							/>
						</Box>
						<Button
							mt={5}
							color='teal'
							type='submit'
							isLoading={isSubmitting}>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
