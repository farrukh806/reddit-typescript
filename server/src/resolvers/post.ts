import { Post } from './../entities/Post';
import { Query, Resolver, Ctx, Arg, Mutation } from 'type-graphql';

import { MyContext } from '../types';

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	posts(@Ctx() ctx: MyContext): Promise<Post[]> {
		return ctx.em.find(Post, {});
	}

	@Query(() => Post, { nullable: true })
	post(@Arg('id') id: number, @Ctx() ctx: MyContext): Promise<Post | null> {
		return ctx.em.findOne(Post, { id });
	}

	@Mutation(() => Post)
	async createPost(
		@Arg('title') title: string,
		@Arg('description') description: string,
		@Ctx() ctx: MyContext
	): Promise<Post> {
		const post = ctx.em.create(Post, { title, description } as Post);
		await ctx.em.persistAndFlush(post);
		return post;
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') id: number,
		@Arg('title') title: string,
		@Arg('description') description: string,
		@Ctx() ctx: MyContext
	): Promise<Post | null> {
		const post = await ctx.em.findOne(Post, { id });
		if (!post) {
			return null;
		}
		if (typeof title !== 'undefined') {
			post.title = title;
			await ctx.em.persistAndFlush(post);
		}
		if (typeof description !== 'undefined') {
			post.description = description;
			await ctx.em.persistAndFlush(post);
		}
		return post;
	}

	@Mutation(() => Boolean)
	async deletePost(
		@Arg('id') id: number,
		@Ctx() ctx: MyContext
	): Promise<boolean> {
		const post = await ctx.em.findOne(Post, { id });
		if (!post) {
			return false;
		}
		await ctx.em.removeAndFlush(post);
		return true;
	}
}
