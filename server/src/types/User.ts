import { Field, InputType, ObjectType } from 'type-graphql';
import { FieldError } from './Error';
import { User } from '../entities/User';

@InputType()
export class UsernamePasswordInputType {
	@Field()
	username!: string;

	@Field()
	email!: string;

	@Field()
	password!: string;
}

@ObjectType()
export class UserResponseType {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}
