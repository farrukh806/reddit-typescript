import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useRegisterMutation } from '../gql/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { createUrqlClient } from '../utils/createUrqlClient';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const [_, register] = useRegisterMutation();
	const router = useRouter();
	return (
		<Wrapper>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						// user register works
						router.push('/');
					}
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

export default withUrqlClient(createUrqlClient)(Register);
