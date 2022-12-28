import { ChakraProvider } from '@chakra-ui/react';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql
} from '@apollo/client';

import { AppProps } from 'next/app';

const cache = new InMemoryCache();

const client = new ApolloClient({
	// Provide required constructor fields
	uri: process.env.NEXT_PUBLIC_API_URL as string,
	cache: new InMemoryCache(),
	credentials: 'include'
});

import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
