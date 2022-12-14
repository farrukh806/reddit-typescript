import { useState } from 'react';
import {
	Stack,
	Box,
	Heading,
	Text,
	Button,
	Flex,
	IconButton
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { withUrqlClient } from 'next-urql';

import {
	useDeletePostMutation,
	useMeQuery,
	usePostsQuery
} from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';
import Link from 'next/link';
import { isServer } from '../utils/isServer';

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 50,
		cursor: null as null | string
	});
	const [{ data: userData }] = useMeQuery({ pause: isServer() });
	const [{ data, fetching }] = usePostsQuery({
		variables
	});
	const [_, deletePost] = useDeletePostMutation();
	return (
		<Layout>
			{fetching && <div>Loading...</div>}
			<Stack spacing={8}>
				<Heading>LeReddit</Heading>
				{data?.posts.posts.map((post) => (
					<Flex key={post.id} borderWidth='1px' shadow='md'>
						<Box>
							<UpdootSection post={post} />
						</Box>
						<Box>
							<Heading p='2'>
								<Link
									href={`/post/[id]`}
									as={`/post/${post.id}`}>
									{post.title.length > 20
										? post.title.slice(0, 20) + '...'
										: post.title}
								</Link>
							</Heading>
							<Text px='4'>
								posted by {post.creator.username}
							</Text>
							<Text p='4'>{post.descriptionSnippet}</Text>
						</Box>
						<Box p='3' ml={'auto'}>
							{userData &&
								userData?.me &&
								userData?.me!.id === post.creator.id && (
									<Link
										href='/post/edit/[id]'
										as={`/post/edit/${post.id}`}>
										<IconButton
											size='md'
											color='blue'
											fontSize={'26px'}
											aria-label='updoot-post'
											icon={<EditIcon />}
										/>
									</Link>
								)}
							{userData &&
								userData?.me &&
								userData?.me!.id === post.creator.id && (
									<IconButton
										size='md'
										mx='2'
										color='red'
										fontSize={'26px'}
										aria-label='updoot-post'
										icon={<DeleteIcon />}
										onClick={async () => {
											deletePost({ id: post.id });
										}}
									/>
								)}
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
export default withUrqlClient(createUrqlClient as any, { ssr: true })(Index);
