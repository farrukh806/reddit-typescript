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
import { Updoot } from '../entities/Updoot';

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => String)
	descriptionSnippet(@Root() root: Post) {
		return root.description.slice(0, 50);
	}

	@Query(() => PaginatedPosts)
	async posts(
		@Arg('limit', () => Int) limit: number,
		@Arg('cursor', () => String, { nullable: true }) cursor: string | null,
		@Ctx() ctx: MyContext
	): Promise<PaginatedPosts> {
		let realLimit = 0;
		if (limit > 0) {
			realLimit = Math.min(50, limit);
		} else {
			realLimit = 50;
		}
		const realLimitPlusOne = realLimit + 1;

		let replacements: any[] = [];
		replacements.push(realLimitPlusOne);

		if (ctx.req.session.userId) {
			replacements.push(ctx.req.session.userId);
		}

		let cursorIdx = 3;
		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
			cursorIdx = replacements.length;
		}
		const posts = await AppDataSource.query(
			`SELECT p.*, 
			json_build_object(
				'id', u.id,
				'username', u.username,
				'email', u.email,
				'created_at', u.created_at,
				'updated_at', u.updated_at
				) creator,
			${
				ctx.req.session.userId
					? '(SELECT value FROM updoot where user_id = $2 AND post_id = p.id) vote_status'
					: 'null as vote_status'
			}
			FROM post p
			INNER JOIN public.user u 
			ON u.id = p.creator_id 
			${cursor ? `WHERE p.created_at < $${cursorIdx}` : ''}
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
	async post(@Arg('id', () => Int) id: number): Promise<Post | null> {
		const replacements = [id];
		const post = await AppDataSource.query(
			`
			SELECT p.*, 
			json_build_object(
				'id', u.id,
				'username', u.username,
				'created_at', u.created_at,
				'updated_at', u.updated_at
				) creator
				FROM post p
				INNER JOIN public.user u 
				ON u.id = p.creator_id 
				WHERE p.id = $1
				`,
			replacements
		);
		return post[0];
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
	@UseMiddleware(isAuth)
	async vote(
		@Arg('post_id', () => Int) post_id: number,
		@Arg('value', () => Int) value: number,
		@Ctx() ctx: MyContext
	) {
		const isUpdoot = value !== -1;
		const vote = isUpdoot ? 1 : -1;
		const user_id = ctx.req.session.userId;

		// check if user is already voted
		const updoot = await Updoot.findOne({ where: { post_id, user_id } });
		// and they want to change their vote
		if (updoot && updoot.value !== vote) {
			await AppDataSource.transaction(async (trManager) => {
				await trManager.query(
					`UPDATE updoot SET value = $1 WHERE post_id = $2 AND user_id = $3`,
					[vote, post_id, user_id]
				);
				await trManager.query(
					`UPDATE post SET points = points + $1 WHERE id = $2`,
					[2 * vote, post_id]
				);
			});
		} else if (!updoot) {
			// they never voted before
			await AppDataSource.transaction(async (trManager) => {
				await trManager.query(
					`INSERT INTO updoot (user_id, post_id, value) VALUES ($1, $2, $3)`,
					[user_id, post_id, vote]
				);

				await trManager.query(
					`UPDATE post SET points = points + $1 WHERE id = $2`,
					[vote, post_id]
				);
			});
		}

		return true;
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
