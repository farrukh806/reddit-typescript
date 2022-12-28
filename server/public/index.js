"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const constants_1 = require("./constants");
const main = async () => {
    await typeorm_config_1.default.initialize();
    await typeorm_config_1.default.runMigrations();
    // await orm. // Updating database migrations to latest version
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default({
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
    });
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'none',
            secure: true,
            domain: ''
        },
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
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
    app.listen(process.env.PORT, () => console.log('Server started on localhost: ' + process.env.PORT));
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map