import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useMeQuery, useLogoutMutation } from '../gql/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	const [{ data }] = useMeQuery({ pause: isServer() });
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

	return (
		<Flex
			position='sticky'
			top='0'
			zIndex={1}
			bg={'teal'}
			p={4}
			ml={'auto'}>
			<Box p={3} ml={'auto'}>
				{!data?.me ? (
					<div>
						<NextLink
							href={'/login'}
							style={{ color: 'white', margin: '12px' }}>
							Login
						</NextLink>

						<NextLink href={'/register'} style={{ color: 'white' }}>
							Register
						</NextLink>
					</div>
				) : (
					<Flex>
						<Box mr='3' style={{ color: 'white' }}>
							{data.me.username}
						</Box>
						<NextLink
							style={{ color: 'white' }}
							href='/create-post'>
							Create post
						</NextLink>
						<Button
							variant={'link'}
							color='white'
							ml='3'
							isLoading={logoutFetching}
							onClick={() => {
								logout();
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
