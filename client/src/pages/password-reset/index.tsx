import { Button, Box, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useForgotPasswordMutation } from '../../gql/graphql';

const ChangePasswordForm: React.FC = () => {
	const [forgotPassword] = useForgotPasswordMutation();
	const toast = useToast();
	return (
		<Wrapper>
			<Formik
				initialValues={{ email: '' }}
				onSubmit={async (values, { setErrors }) => {
					await forgotPassword({ variables: values });
					toast({
						title: 'Email sent',
						description: ' Email sent successfully',
						status: 'success',
						duration: 9000,
						isClosable: true
					});
				}}>
				{({ isSubmitting }) => (
					<Form>
						<Box mt={8}>
							<InputField
								name='email'
								placeholder='email'
								type='email'
								label='Email'
							/>
						</Box>
						<Button
							mt={5}
							mr={2}
							color='teal'
							type='submit'
							isLoading={isSubmitting}>
							Forgot Password
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default ChangePasswordForm;
