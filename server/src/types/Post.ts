import { Post } from '../entities/Post';
import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class PostInputType {
	@Field(() => String)
	title!: string;

	@Field(() => String)
	description!: string;
}

@ObjectType()
export class PaginatedPosts {
	@Field(() => [Post])
	posts!: Post[];

	@Field()
	hasMore!: boolean;
}
