import path from 'path';
import 'dotenv-safe/config';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { DataSource } from 'typeorm';
import { Updoot } from './entities/Updoot';

const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	entities: [User, Post, Updoot],
	synchronize: true,
	logging: true,
	migrations: [path.join(__dirname, './migrations/*')]
});

export default AppDataSource;
