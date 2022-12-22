import { Stack, Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';

import { usePostsQuery } from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';

const Index = () => {
	const [{ data, fetching }] = usePostsQuery({
		variables: {
			limit: 10
		}
	});
	return (
		<Layout>
			{fetching && <div>Loading...</div>}
			<Stack spacing={8}>
				<Heading>LeReddit</Heading>
				{data?.posts.map((post) => (
					<Box key={post.id} borderWidth='1px' shadow='md'>
						<Heading p='4'>{post.title}</Heading>
						<Text p='4'>{post.descriptionSnippet}</Text>
					</Box>
				))}
				{!data && !fetching ? <div>No posts available</div> : null}1
			</Stack>
			{data ? (
				<Flex my='8'>
					<Button  m='auto'>
						Load more
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
