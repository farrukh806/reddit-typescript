import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import mikroOrmConfig from './mikro-orm.config';
import { COOKIE_NAME } from './constants';

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	await orm.getMigrator().up(); // Updating database migrations to latest version

	const RedisStore = connectRedis(session);
	const redisClient = createClient({ legacyMode: true });

	redisClient.on('error', (err: Error) =>
		console.log('Redis Client Error', err)
	);

	await redisClient.connect().catch(console.error);

	const app = express();
	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	);
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redisClient as any,
				disableTouch: true
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,
				sameSite: 'lax', // csrf protection
				secure: false // works with HTTPS and HTTP also
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
		context: ({ req, res }) => ({ em: orm.em, req, res })

		// Uncomment the following block to enable testing using apollo sandbox in browser
		// formatResponse: (responseFromServer, query) => {
		// 	const { req, res } = query.context;
		// 	res.header(
		// 		'Access-Control-Allow-Origin',
		// 		'https://studio.apollographql.com'
		// 	);
		// 	res.header('Access-Control-Allow-Credentials', true);
		// 	return responseFromServer;
		// }
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({
		app,
		cors: false
	});

	app.listen(4000, () => console.log('Server started on localhost:4000'));
};
main().catch((err) => console.error(err));
