import { useRouter } from 'next/router';
import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePostQuery } from '../../gql/graphql';
import Layout from '../../components/Layout';
import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const Post = () => {
	const router = useRouter();
	let id: any = router.query.id;
	if (typeof id === 'string') {
		id = parseInt(id);
	} else id = -1;
	const [{ fetching, data, error }] = usePostQuery({
		variables: { id }
	});

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
		<Layout>
			<Heading mb='4'> {data?.post?.title}</Heading>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient as any, { ssr: true })(Post);
