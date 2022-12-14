import {
	Resolver,
	Mutation,
	Arg,
	InputType,
	Field,
	Ctx,
	ObjectType
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from './../entities/User';
import { MyContext } from './../types';

@InputType()
class UsernamePasswordInputType {
	@Field()
	username!: string;

	@Field()
	password!: string;
}

@ObjectType()
class FieldError {
	@Field(() => String)
	message?: string;

	@Field(() => String)
	field?: string;
}

@ObjectType()
class UserResponseType {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Mutation(() => UserResponseType)
	async register(
		@Arg('options') options: UsernamePasswordInputType,
		@Ctx() ctx: MyContext
	): Promise<UserResponseType> {
		if (options.username.length <= 2) {
			return {
				errors: [
					{
						field: 'username',
						message: 'username must be at least 2 characters long'
					}
				]
			};
		}
		if (options.password.length <= 5) {
			return {
				errors: [
					{
						field: 'password',
						message: 'password must be at least 5 characters long'
					}
				]
			};
		}
		const hashedPassword = await argon2.hash(options.password);
		const user = ctx.em.create(User, {
			username: options.username,
			password: hashedPassword
		} as User);
		try {
			await ctx.em.persistAndFlush(user);
			return { user };
		} catch (err: any) {
			if (err.code === '23505') {
				// duplicate username error
				return {
					errors: [
						{
							field: 'username',
							message: 'username already taken'
						}
					]
				};
			}
			return { errors: [err.message] };
		}
	}

	@Mutation(() => UserResponseType)
	async login(
		@Arg('options') options: UsernamePasswordInputType,
		@Ctx() ctx: MyContext
	): Promise<UserResponseType> {
		const userExists = await ctx.em.findOne(User, {
			username: options.username
		});
		if (typeof userExists !== 'undefined' && userExists !== null) {
			const passwordMatched = await argon2.verify(
				userExists.password,
				options.password
			);
			if (passwordMatched) {
                
				ctx.req.session.userId = userExists.id;
				console.log(ctx.req.session);
				return { user: userExists };
			} else {
				return {
					errors: [
						{
							field: 'password',
							message: 'password does not match'
						}
					]
				};
			}
		}
		return {
			errors: [{ field: 'username', message: 'username does not exist' }]
		};
	}
}
