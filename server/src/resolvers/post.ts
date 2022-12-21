import { Post } from './../entities/Post';
import { Query, Resolver, Arg, Mutation } from 'type-graphql';

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	posts(): Promise<Post[]> {
		return Post.find();
	}

	@Query(() => Post, { nullable: true })
	post(@Arg('id') id: number): Promise<Post | null> {
		return Post.findOne({ where: { id } });
	}

	@Mutation(() => Post)
	async createPost(
		@Arg('title') title: string,
		@Arg('description') description: string
	): Promise<Post> {
		const post = Post.create({ title, description });
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
