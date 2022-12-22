import router from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../gql/graphql';

export const useIsAuth = () => {
	const [{ data, fetching }] = useMeQuery();

	useEffect(() => {
		if (!fetching && !data?.me) {
			router.replace('/login?next=' + router.pathname);
		}
	}, [fetching, data, router]);
};
