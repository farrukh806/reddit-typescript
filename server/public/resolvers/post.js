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
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./../entities/Post");
const Post_2 = require("../types/Post");
const isAuth_1 = require("../middlewares/isAuth");
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const Updoot_1 = require("../entities/Updoot");
let PostResolver = class PostResolver {
    descriptionSnippet(root) {
        return root.description.slice(0, 50);
    }
    async posts(limit, cursor, ctx) {
        let realLimit = 0;
        if (limit > 0) {
            realLimit = Math.min(50, limit);
        }
        else {
            realLimit = 50;
        }
        const realLimitPlusOne = realLimit + 1;
        let replacements = [];
        replacements.push(realLimitPlusOne);
        if (ctx.req.session.userId) {
            replacements.push(ctx.req.session.userId);
        }
        let cursorIdx = 3;
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
            cursorIdx = replacements.length;
        }
        const posts = await typeorm_config_1.default.query(`SELECT p.*, 
			json_build_object(
				'id', u.id,
				'username', u.username,
				'email', u.email,
				'created_at', u.created_at,
				'updated_at', u.updated_at
				) creator,
			${ctx.req.session.userId
            ? '(SELECT value FROM updoot where user_id = $2 AND post_id = p.id) vote_status'
            : 'null as vote_status'}
			FROM post p
			INNER JOIN public.user u 
			ON u.id = p.creator_id 
			${cursor ? `WHERE p.created_at < $${cursorIdx}` : ''}
			ORDER BY p.created_at DESC 
			limit $1`, replacements);
        return {
            posts: posts.slice(0, realLimit),
            hasMore: posts.length === realLimitPlusOne
        };
    }
    async post(id) {
        const replacements = [id];
        const post = await typeorm_config_1.default.query(`
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
				`, replacements);
        return post[0];
    }
    async createPost(input, ctx) {
        const { title, description } = input;
        const post = Post_1.Post.create({
            title,
            description,
            creator_id: ctx.req.session.userId
        });
        return Post_1.Post.save(post);
    }
    async updatePost(id, title, description, ctx) {
        const post = await Post_1.Post.findOne({
            where: { id, creator_id: ctx.req.session.userId }
        });
        if (!post) {
            return null;
        }
        if (typeof title !== 'undefined') {
            post.title = title;
            await Post_1.Post.save(post);
        }
        if (typeof description !== 'undefined') {
            post.description = description;
            await Post_1.Post.save(post);
        }
        return post;
    }
    async vote(post_id, value, ctx) {
        const isUpdoot = value !== -1;
        const vote = isUpdoot ? 1 : -1;
        const user_id = ctx.req.session.userId;
        // check if user is already voted
        const updoot = await Updoot_1.Updoot.findOne({ where: { post_id, user_id } });
        // and they want to change their vote
        if (updoot && updoot.value !== vote) {
            await typeorm_config_1.default.transaction(async (trManager) => {
                await trManager.query(`UPDATE updoot SET value = $1 WHERE post_id = $2 AND user_id = $3`, [vote, post_id, user_id]);
                await trManager.query(`UPDATE post SET points = points + $1 WHERE id = $2`, [2 * vote, post_id]);
            });
        }
        else if (!updoot) {
            // they never voted before
            await typeorm_config_1.default.transaction(async (trManager) => {
                await trManager.query(`INSERT INTO updoot (user_id, post_id, value) VALUES ($1, $2, $3)`, [user_id, post_id, vote]);
                await trManager.query(`UPDATE post SET points = points + $1 WHERE id = $2`, [vote, post_id]);
            });
        }
        return true;
    }
    async deletePost(id, ctx) {
        const updoot = await Updoot_1.Updoot.findOne({ where: { post_id: id } });
        if (updoot) {
            await Updoot_1.Updoot.delete({
                post_id: id
            });
        }
        const result = await Post_1.Post.delete({
            id,
            creator_id: ctx.req.session.userId
        });
        if (result.affected === 0) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => String),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "descriptionSnippet", null);
__decorate([
    (0, type_graphql_1.Query)(() => Post_2.PaginatedPosts),
    __param(0, (0, type_graphql_1.Arg)('limit', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('cursor', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_2.PostInputType, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('title')),
    __param(2, (0, type_graphql_1.Arg)('description')),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('post_id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('value', () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "vote", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map