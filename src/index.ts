import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { __prod__ } from './constants';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up(); // Updating database migrations to latest version

	const RedisStore = connectRedis(session);
	const redisClient = createClient({ legacyMode: true }) as any;
	redisClient.connect().catch((err: Error) => console.error(err));

	const app = express();

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({
				client: redisClient,
				disableTouch: true
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,
				sameSite: 'lax', // csrf protection
				secure: __prod__ // only works with HTTPS
			},
			secret: 'bssecret',
			saveUninitialized: false,
			resave: false
		})
	);
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false
		}),
		context: ({ req, res }) => ({ em: orm.em, req, res }) // This context object is available to all resolvers
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => console.log('Server started on localhost:4000'));
};
main().catch((err) => console.error(err));
