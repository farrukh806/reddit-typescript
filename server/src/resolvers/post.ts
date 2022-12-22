import { Post } from './../entities/Post';
import {
	Query,
	Resolver,
	Arg,
	Mutation,
	Ctx,
	UseMiddleware,
	Int
} from 'type-graphql';

import { PostInputType } from '../types/Post';
import { MyContext } from '../contextTypes';
import { isAuth } from '../middlewares/isAuth';
import AppDataSource from '../typeorm.config';

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	async posts(
		@Arg('limit') limit: number,
		@Arg('cursor', () => String, { nullable: true }) cursor: string | null
	): Promise<Post[]> {
		const realLimit = Math.min(50, limit);
		const queryBuilder = AppDataSource.getRepository(Post)
			.createQueryBuilder('post')
			.take(realLimit)
			.orderBy('created_at', 'DESC');

		if (cursor) {
			queryBuilder.where('created_at < :cursor', {
				cursor: new Date(parseInt(cursor))
			});
		}
		return queryBuilder.getMany();
	}

	@Query(() => Post, { nullable: true })
	post(@Arg('id') id: number): Promise<Post | null> {
		return Post.findOne({ where: { id } });
	}

	@Mutation(() => Post)
	@UseMiddleware(isAuth)
	async createPost(
		@Arg('input') input: PostInputType,
		@Ctx() ctx: MyContext
	): Promise<Post> {
		const { title, description } = input;
		const post = Post.create({
			title,
			description,
			creator_id: ctx.req.session.userId
		});
		return Post.save(post);
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') id: number,
		@Arg('title') title: string,
		@Arg('description') description: string
	): Promise<Post | null> {
		const post = await Post.findOne({ where: { id } });
		if (!post) {
			return null;
		}
		if (typeof title !== 'undefined') {
			post.title = title;
			await Post.save(post);
		}
		if (typeof description !== 'undefined') {
			post.description = description;
			await Post.save(post);
		}
		return post;
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg('id') id: number): Promise<boolean> {
		const result = await Post.delete(id);

		if (result.affected === 0) {
			return false;
		}
		return true;
	}
}
