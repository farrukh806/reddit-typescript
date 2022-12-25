import { Button, Box, useToast } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';

import { useCreatePostMutation } from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC = () => {
	const router = useRouter();
	const toast = useToast();
	const [_, createPost] = useCreatePostMutation();
	useIsAuth();
	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ title: '', description: '' }}
				onSubmit={async (values, { setErrors }) => {
					const { error } = await createPost({ input: values });
					console.log(error);
					if (!error) {
						toast({
							title: 'Post added',
							status: 'success',
							duration: 2000,
							isClosable: true
						});
						router.push('/');
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='title'
							placeholder='title'
							type='text'
							label='Title'
						/>
						<Box mt={8}>
							<InputField
								name='description'
								placeholder='description'
								textarea
								label='Description'
							/>
						</Box>
						<Button
							mt={5}
							mr={2}
							color='teal'
							type='submit'
							isLoading={isSubmitting}>
							Add Post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient as any, { ssr: true })(CreatePost);
