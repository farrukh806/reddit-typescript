"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const uuid_1 = require("uuid");
const User_1 = require("./../entities/User");
const constants_1 = require("../constants");
const sendMail_1 = require("../utils/sendMail");
const User_2 = require("../types/User");
let UserResolver = class UserResolver {
    email(root, ctx) {
        // this is the current user and its ok to show them their own email
        if (ctx.req.session.userId === root.id) {
            return root.email;
        }
        // current user wants to see someone elses email
        else {
            return '';
        }
    }
    async me(ctx) {
        if (ctx.req.session.userId) {
            const user = await User_1.User.findOne({
                where: { id: ctx.req.session.userId }
            });
            if (!user) {
                return null;
            }
            return user;
        }
        else {
            // not logged in
            return null;
        }
    }
    async register(options, ctx) {
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
        const hashedPassword = await argon2_1.default.hash(options.password);
        try {
            const user = await User_1.User.create({
                username: options.username,
                email: options.email,
                password: hashedPassword
            }).save();
            console.log(user);
            // set a cookie to the user
            // this will keep them logged in
            ctx.req.session.userId = user.id;
            return { user };
        }
        catch (err) {
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
                }
                else {
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
    async login(usernameOrEmail, password, ctx) {
        const userExists = await User_1.User.findOne({
            where: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });
        if (typeof userExists !== 'undefined' && userExists !== null) {
            const passwordMatched = await argon2_1.default.verify(userExists.password, password);
            if (passwordMatched) {
                ctx.req.session.userId = userExists.id;
                return { user: userExists };
            }
            else {
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
    logout(ctx) {
        return new Promise((resolve) => {
            ctx.req.session.destroy((err) => {
                if (err) {
                    resolve(false);
                    return false;
                }
                ctx.res.clearCookie(constants_1.COOKIE_NAME);
                resolve(true);
                return true;
            });
        });
    }
    async forgotPassword(email, ctx) {
        const userExists = await User_1.User.findOne({ where: { email } });
        if (!userExists) {
            // email does not exists
            return false;
        }
        const token = (0, uuid_1.v4)();
        await ctx.redis.set(constants_1.FORGOT_PASSWORD_PREFIX + token, userExists.id, 'EX', 1000 * 60 * 60 * 24 // 1 day as expiration
        );
        await (0, sendMail_1.sendEmail)(email, `<a href="http://localhost:3000/password-reset/${token}">Reset Password</a>`);
        return true;
    }
    async changePassword(token, newPassword, ctx) {
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
        const userId = await ctx.redis.get(constants_1.FORGOT_PASSWORD_PREFIX + token);
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
        const user = await User_1.User.findOne({ where: { id } });
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
        let hashedPassword = await argon2_1.default.hash(newPassword);
        await User_1.User.update(id, { password: hashedPassword });
        await ctx.redis.del(constants_1.FORGOT_PASSWORD_PREFIX + token);
        // login user
        ctx.req.session.userId = user.id;
        return { user };
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_2.UserResponseType),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_2.UsernamePasswordInputType, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_2.UserResponseType),
    __param(0, (0, type_graphql_1.Arg)('usernameOrEmail')),
    __param(1, (0, type_graphql_1.Arg)('password')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('email')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_2.UserResponseType),
    __param(0, (0, type_graphql_1.Arg)('token')),
    __param(1, (0, type_graphql_1.Arg)('newPassword')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map