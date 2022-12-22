import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import Link from 'next/link';

import InputField from '../components/InputField';
import { FieldError, useLoginMutation } from '../gql/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const [_, login] = useLoginMutation();
	const router = useRouter();
	const { next } = router.query;
	return (
		<Layout>
			<Formik
				initialValues={{ usernameOrEmail: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login(values);
					if (response.data?.login.errors) {
						setErrors(
							toErrorMap(
								response.data.login.errors as FieldError[]
							)
						);
					} else if (response.data?.login.user) {
						// user login works 
						if (typeof next === 'string') {
							router.push(next);
						} else {
							router.push('/');
						}
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='usernameOrEmail'
							placeholder='username or email'
							label='Username or Email'
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
							mr={2}
							color='teal'
							type='submit'
							isLoading={isSubmitting}>
							Login
						</Button>
						<Button mt={5} color='teal'>
							<Link href='/password-reset' color='coral'>
								Forgot Password
							</Link>
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
