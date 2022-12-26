import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
	@Field()
	@Column()
	value!: number;

	@Field()
	@PrimaryColumn()
	user_id!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.updoots)
	user!: User;

	@Field()
	@PrimaryColumn()
	post_id!: number;

	@Field(() => Post)
	@ManyToOne(() => Post, (post) => post.updoots)
	post!: Post;
}
