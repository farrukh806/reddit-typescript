import React from 'react';
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useMeQuery, useLogoutMutation } from '../gql/graphql';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	const [{ data, fetching }] = useMeQuery();
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	let body = null;

	// data loading
	if (fetching) {
		// user is not logged in
	} else if (!data?.me) {
		// user is logged in
		body = (
			<>
				<NextLink href={'/login'}>
					<Link color='white' mr={2}>
						Login
					</Link>
				</NextLink>

				<NextLink href={'/register'}>
					<Link color='white'>Register</Link>
				</NextLink>
			</>
		);
	} else {
		body = (
			<Flex>
				<Box>{data.me.username}</Box>
				<Button
					variant={'link'}
					color='black'
					ml='4'
					isLoading={logoutFetching}
					onClick={() => {
						logout();
					}}>
					Logout
				</Button>
			</Flex>
		);
	}
	return (
		<Flex bg={'teal'} p={4} ml={'auto'}>
			<Box p={3} ml={'auto'}>
				{body}
			</Box>
		</Flex>
	);
};

export default Navbar;
