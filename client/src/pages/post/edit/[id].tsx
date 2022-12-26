import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { Box, Button, useToast } from '@chakra-ui/react';

import { createUrqlClient } from '../../../utils/createUrqlClient';
import { usePostQuery, useUpdatePostMutation } from '../../../gql/graphql';
import Layout from '../../../components/Layout';
import { Formik, Form } from 'formik';
import InputField from '../../../components/InputField';
import { useIsAuth } from '../../../utils/useIsAuth';

const EditPost = () => {
	useIsAuth();
	const router = useRouter();
	const toast = useToast();
	let id: any = router.query.id;

	if (typeof id === 'string') {
		id = parseInt(id);
	} else id = -1;

	const [{ fetching, data, error }] = usePostQuery({
		variables: { id }
	});

	const [_, updatePost] = useUpdatePostMutation();

	if (error) {
		return (
			<Layout>
				<Box>{error.message}</Box>
			</Layout>
		);
	}

	if (!data?.post) {
		return (
			<Layout>
				<Box>Could not find post</Box>
			</Layout>
		);
	}
	if (fetching) {
		return <Layout>Loading...</Layout>;
	}

	return (
		<Layout variant='small'>
			<Formik
				initialValues={{
					title: data?.post?.title,
					description: data?.post?.description
				}}
				onSubmit={async (values, { setErrors }) => {
					const { error } = await updatePost({
						id,
						title: values.title,
						description: values.description
					});
					console.log(error);
					if (!error) {
						toast({
							title: 'Post updated',
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
							Update Post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient as any, { ssr: true })(EditPost);
