import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);

	await orm.getMigrator().up();
	const post = orm.em.create(Post, {
		title: 'My third tests post',
		description: 'test'
	} as Post);
	await orm.em.persistAndFlush(post);
	const data = await orm.em.find(Post, {});
	console.log(data);
};
main().catch((err) => console.error(err));
