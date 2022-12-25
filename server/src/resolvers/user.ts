import {
	Resolver,
	Mutation,
	Query,
	Arg,
	Ctx,
	FieldResolver,
	Root
} from 'type-graphql';
import argon2 from 'argon2';
import { v4 } from 'uuid';

import { User } from './../entities/User';
import { MyContext } from '../contextTypes';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants';
import { sendEmail } from '../utils/sendMail';
import { UserResponseType, UsernamePasswordInputType } from '../types/User';

@Resolver(User)
export class UserResolver {
	@FieldResolver()
	email(@Root() root: User, @Ctx() ctx: MyContext) {
		// this is the current user and its ok to show them their own email
		if (ctx.req.session.userId === root.id) {
			return root.email;
		}

		// current user wants to see someone elses email
		else {
			return '';
		}
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() ctx: MyContext) {
		if (ctx.req.session.userId) {
			const user = await User.findOne({
				where: { id: ctx.req.session.userId }
			});
			if (!user) {
				return null;
			}
			return user;
		} else {
			// not logged in
			return null;
		}
	}

	@Mutation(() => UserResponseType)
	async register(
		@Arg('options') options: UsernamePasswordInputType,
		@Ctx() ctx: MyContext
	): Promise<UserResponseType> {
		if (options.email.length <= 6) {
			return {
				errors: [
					{
						field: 'email',
						message: 'email must be at least 6 characters long'
					}
				]
			};
		}
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

		try {
			const user = await User.create({
				username: options.username,
				email: options.email,
				password: hashedPassword
			}).save();
			console.log(user);
			// set a cookie to the user
			// this will keep them logged in
			ctx.req.session.userId = user.id;
			return { user };
		} catch (err: any) {
			if (err.code === '23505') {
				// duplicate username error
				if (err.detail.includes('username')) {
					return {
						errors: [
							{
								field: 'username',
								message: 'username already taken'
							}
						]
					};
				} else {
					return {
						errors: [
							{
								field: 'email',
								message: 'email already taken'
							}
						]
					};
				}
			}
			return { errors: [err.message] };
		}
	}

	@Mutation(() => UserResponseType)
	async login(
		@Arg('usernameOrEmail') usernameOrEmail: string,
		@Arg('password') password: string,
		@Ctx() ctx: MyContext
	): Promise<UserResponseType> {
		const userExists = await User.findOne({
			where: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
		});
		if (typeof userExists !== 'undefined' && userExists !== null) {
			const passwordMatched = await argon2.verify(
				userExists.password,
				password
			);
			if (passwordMatched) {
				ctx.req.session.userId = userExists.id;
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
			errors: [
				{
					field: 'usernameOrEmail',
					message: 'username or email does not exist'
				}
			]
		};
	}

	@Mutation(() => Boolean)
	logout(@Ctx() ctx: MyContext) {
		return new Promise((resolve) => {
			ctx.req.session.destroy((err) => {
				if (err) {
					resolve(false);
					return false;
				}
				ctx.res.clearCookie(COOKIE_NAME);
				resolve(true);
				return true;
			});
		});
	}

	@Mutation(() => Boolean)
	async forgotPassword(@Arg('email') email: string, @Ctx() ctx: MyContext) {
		const userExists = await User.findOne({ where: { email } });
		if (!userExists) {
			// email does not exists
			return false;
		}
		const token = v4();
		await ctx.redis.set(
			FORGOT_PASSWORD_PREFIX + token,
			userExists.id,
			'EX',
			1000 * 60 * 60 * 24 // 1 day as expiration
		);
		await sendEmail(
			email,
			`<a href="http://localhost:3000/password-reset/${token}">Reset Password</a>`
		);
		return true;
	}

	@Mutation(() => UserResponseType)
	async changePassword(
		@Arg('token') token: string,
		@Arg('newPassword') newPassword: string,
		@Ctx() ctx: MyContext
	): Promise<UserResponseType> {
		if (newPassword.length <= 5) {
			return {
				errors: [
					{
						field: 'newPassword',
						message: 'password must be at least 5 characters long'
					}
				]
			};
		}
		const userId = await ctx.redis.get(FORGOT_PASSWORD_PREFIX + token);
		if (!userId) {
			return {
				errors: [
					{
						field: 'token',
						message: 'token expired'
					}
				]
			};
		}

		const id = parseInt(userId);

		const user = await User.findOne({ where: { id } });
		if (!user) {
			return {
				errors: [
					{
						field: 'token',
						message: 'user no longer exists'
					}
				]
			};
		}
		let hashedPassword = await argon2.hash(newPassword);
		await User.update(id, { password: hashedPassword });
		await ctx.redis.del(FORGOT_PASSWORD_PREFIX + token);
		// login user
		ctx.req.session.userId = user.id;
		return { user };
	}
}
