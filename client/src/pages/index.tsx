import { withUrqlClient } from 'next-urql';

import Navbar from '../components/Navbar';

import { usePostsQuery } from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
	const [{ data, fetching }] = usePostsQuery();
	return (
		<>
			<Navbar />
			{fetching && <div>Loading...</div>}
			{data?.posts.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
		</>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
