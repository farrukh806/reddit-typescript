import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn({ type: 'int' })
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	description!: string;

	@Field()
	@Column({ type: 'int', default: 0 })
	points!: number;

	@Field()
	@Column()
	creator_id!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.posts)
	creator!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at!: Date;
}
