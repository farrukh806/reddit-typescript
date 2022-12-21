import { MikroORM } from '@mikro-orm/core';
import path from 'path';

import { User } from './entities/User';
import { Post } from './entities/Post';
import { __prod__ } from './constants';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'reddit',
	entities: [User, Post],
	synchronize: true,
	// logging: true,
	migrations: {
		path: path.join(__dirname, './migrations'),
		glob: '!(*.d).{js,ts}'
	}
});

export default AppDataSource;
