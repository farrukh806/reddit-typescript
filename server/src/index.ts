import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import AppDataSource from './typeorm.config';
import { COOKIE_NAME } from './constants';

const main = async () => {
	await AppDataSource.initialize();
	await AppDataSource.runMigrations();

	// await orm. // Updating database migrations to latest version
	const RedisStore = connectRedis(session);
	const redis = new Redis({
		host: process.env.REDIS_HOST,
		username: process.env.REDIS_USERNAME,
		port: parseInt(process.env.REDIS_PORT),
		password: process.env.REDIS_PASSWORD
	});

	const app = express();
	app.set('trust proxy', 1);
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true
		})
	);
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis as any,
				disableTouch: true
			}),
			cookie: {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24,
				sameSite: 'none', // csrf protection
				secure: true,
				domain: ''
			},
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false,
			resave: false
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false
		}),
		context: ({ req, res }) => ({ req, res, redis })

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
	app.get('/', (req, res) => res.send('Hello'));
	app.listen(process.env.PORT, () =>
		console.log('Server started on localhost: ' + process.env.PORT)
	);
};
main().catch((err) => console.error(err));
