import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn({ type: 'int' })
	id!: number;

	@Field(() => String)
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@OneToMany(() => Post, (post) => post.creator)
	posts!: Post[];

	@Field(() => String)
	@CreateDateColumn()
	created_at!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at!: Date;
}
