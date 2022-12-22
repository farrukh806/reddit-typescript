import { Field, InputType } from 'type-graphql';

@InputType()
export class PostInputType {
	@Field(() => String)
	title!: string;

	@Field(() => String)
	description!: string;
}
