import { useState } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';

import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import { FieldError, useChangePasswordMutation } from '../../gql/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage<{ token: string }> = (props) => {
	const [_, changePassword] = useChangePasswordMutation();
	const [tokenError, setTokenError] = useState('');

	return (
		<Wrapper>
			<Formik
				initialValues={{ newPassword: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await changePassword({
						newPassword: values.newPassword,
						token: props.token
					});
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(
							response.data.changePassword.errors as FieldError[]
						);
						if ('token' in errorMap) {
							setTokenError(errorMap['token']);
						}
						setErrors(errorMap);
					} else if (response.data?.changePassword.user) {
						// works
						router.push('/');
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						{tokenError ? (
							<Box color={'red'}>{tokenError}</Box>
						) : (
							''
						)}
						<InputField
							name='newPassword'
							placeholder='new password'
							label='New Password'
						/>
						<Button
							mt={5}
							color='teal'
							type='submit'
							isLoading={isSubmitting}>
							Change Password
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

ChangePassword.getInitialProps = (context) => {
	return { token: context.query.token as string };
};
export default withUrqlClient(createUrqlClient as any)(ChangePassword);
