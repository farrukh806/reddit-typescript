import { useState } from 'react';
import { Stack, Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';

import { usePostsQuery } from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 50,
		cursor: null as null | string
	});
	const [{ data, fetching }] = usePostsQuery({
		variables
	});
	return (
		<Layout>
			{fetching && <div>Loading...</div>}
			<Stack spacing={8}>
				<Heading>LeReddit</Heading>
				{data?.posts.posts.map((post) => (
					<Flex key={post.id} borderWidth='1px' shadow='md'>
						<UpdootSection post={post} />
						<Box>
							<Heading p='2'>{post.title}</Heading>
							<Text px='4'>
								posted by {post.creator.username}
							</Text>
							<Text p='4'>{post.descriptionSnippet}</Text>
						</Box>
					</Flex>
				))}
				{!data && !fetching ? <div>No posts available</div> : null}1
			</Stack>
			{data && data.posts.hasMore ? (
				<Flex>
					<Button
						onClick={() => {
							setVariables({
								limit: variables.limit,
								cursor: data.posts.posts[
									data.posts.posts.length - 1
								].created_at
							});
						}}
						isLoading={fetching}
						m='auto'
						my={8}>
						load more
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
