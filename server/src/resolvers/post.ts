import {
	Query,
	Resolver,
	Arg,
	Mutation,
	Ctx,
	UseMiddleware,
	Int,
	FieldResolver,
	Root
} from 'type-graphql';

import { Post } from './../entities/Post';
import { PaginatedPosts, PostInputType } from '../types/Post';
import { MyContext } from '../contextTypes';
import { isAuth } from '../middlewares/isAuth';
import AppDataSource from '../typeorm.config';

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => String)
	descriptionSnippet(@Root() root: Post) {
		return root.description.slice(0, 50);
	}

	@Query(() => PaginatedPosts)
	async posts(
		@Arg('limit', () => Int) limit: number,
		@Arg('cursor', () => String, { nullable: true }) cursor: string | null
	): Promise<PaginatedPosts> {
		let realLimit = 0;
		if (limit > 0) {
			realLimit = Math.min(50, limit);
		} else {
			realLimit = 50;
		}
		const realLimitPlusOne = realLimit + 1;
		let replacements: any[] = [];
		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}
		replacements.push(realLimitPlusOne);
		const posts = await AppDataSource.query(
			`SELECT p.*, 
			json_build_object(
				'id', u.id,
				'username', u.username,
				'email', u.email,
				'created_at', u.created_at,
				'updated_at', u.updated_at
				) creator
			FROM post p
			INNER JOIN public.user u 
			ON u.id = p.creator_id 
			${cursor ? `WHERE p.created_at < $2` : ''}
			ORDER BY p.created_at DESC 
			limit $1`,
			replacements
		);

		return {
			posts: posts.slice(0, realLimit),
			hasMore: posts.length === realLimitPlusOne
		};
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
