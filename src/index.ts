import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up(); // Updating database migrations to latest version

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver],
			validate: false
		}),
		context: () => ({ em: orm.em }) // This context object is available to all resolvers
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => console.log('Server started on localhost:4000'));
};
main().catch((err) => console.error(err));
