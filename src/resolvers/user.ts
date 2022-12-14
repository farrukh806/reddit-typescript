import { Resolver, Mutation, Arg, InputType, Field, Ctx } from 'type-graphql';
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

@Resolver()
export class UserResolver {
	@Mutation(() => User)
	async register(
		@Arg('options') options: UsernamePasswordInputType,
		@Ctx() ctx: MyContext
	) {
		const hashedPassword = await argon2.hash(options.password);
		const user = ctx.em.create(User, {
			username: options.username,
			password: hashedPassword
		} as User);
		await ctx.em.persistAndFlush(user);
		return user;
	}
}
