import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useMeQuery, useLogoutMutation } from '../gql/graphql';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	const { loading, data } = useMeQuery({ skip: isServer() });
	const apolloClient = useApolloClient();
	const router = useRouter();
	const [logout, { loading: logoutFetching }] = useLogoutMutation();

	return (
		<Flex
			position='sticky'
			top='0'
			zIndex={1}
			bg={'teal'}
			p={4}
			ml={'auto'}>
			<Link href={'/'}>
				<Heading>LeReddit</Heading>
			</Link>
			<Box p={3} ml={'auto'}>
				{!data?.me ? (
					<div>
						<Link
							href={'/login'}
							style={{ color: 'white', margin: '12px' }}>
							Login
						</Link>

						<Link href={'/register'} style={{ color: 'white' }}>
							Register
						</Link>
					</div>
				) : (
					<Flex>
						<Box mr='3' style={{ color: 'white' }}>
							{data.me.username}
						</Box>
						<Link style={{ color: 'white' }} href='/create-post'>
							Create post
						</Link>
						<Button
							variant={'link'}
							color='white'
							ml='3'
							isLoading={logoutFetching}
							onClick={async () => {
								await logout();
								await apolloClient.resetStore();
							}}>
							Logout
						</Button>
					</Flex>
				)}
			</Box>
		</Flex>
	);
};

export default Navbar;
