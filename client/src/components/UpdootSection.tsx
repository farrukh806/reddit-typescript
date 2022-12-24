import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { PostsQuery, useVoteMutation } from '../gql/graphql';

interface UpdootSectionProps {
	post: PostsQuery['posts']['posts'][0];
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
	const [loading, setLoading] = useState<
		'updoot-loading' | 'downdoot-loading' | 'not-loading'
	>();
	const [_, vote] = useVoteMutation();
	return (
		<Box my='auto' ml='2'>
			<Box p='2'>
				<IconButton
					size='md'
					fontSize={'26px'}
					aria-label='updoot-post'
					isLoading={loading === 'updoot-loading'}
					icon={<ChevronUpIcon />}
					onClick={async () => {
						setLoading('updoot-loading');
						await vote({ post_id: post.id, value: 1 });
						setLoading('not-loading');
					}}
				/>
			</Box>
			<Box mx='5' fontSize={30}>
				{post.points}
			</Box>
			<Box p='2'>
				<IconButton
					size='md'
                    fontSize={'26px'}
					isLoading={loading === 'downdoot-loading'}
					aria-label='downdoot-post'
					icon={<ChevronDownIcon />}
					onClick={async () => {
						setLoading('downdoot-loading');
						await vote({ post_id: post.id, value: -1 });
						setLoading('not-loading');
					}}
				/>
			</Box>
		</Box>
	);
};

export default UpdootSection;
