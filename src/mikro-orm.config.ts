import { MikroORM } from '@mikro-orm/core';
import path from 'path';

import { User } from './entities/User';
import { Post } from './entities/Post';
import { __prod__ } from './constants';

export default {
	dbName: 'reddit',
	user: 'postgres',
	password: 'postgres',
	entities: [Post, User],
	type: 'postgresql',
	// debug: !__prod__,
	allowGlobalContext: true,
	migrations: {
		path: path.join(__dirname, './migrations'),
		glob: '!(*.d).{js,ts}'
	}
} as Parameters<typeof MikroORM.init>[0];
