import path from 'path';

import { User } from './entities/User';
import { Post } from './entities/Post';
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
	logging: true,
	migrations: [path.join(__dirname, './migrations/*')]
});

export default AppDataSource;
