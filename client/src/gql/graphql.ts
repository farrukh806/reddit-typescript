/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */

export type Regular_ErrorFragment = {
	__typename?: 'FieldError';
	field: string;
	message: string;
} & { ' $fragmentName'?: 'Regular_ErrorFragment' };

export type Regular_PostFragment = {
	__typename?: 'Post';
	id: number;
	title: string;
	description: string;
	points: number;
	creator_id: number;
	created_at: string;
	updated_at: string;
	creator: { __typename?: 'User'; id: number; username: string };
} & { ' $fragmentName'?: 'Regular_PostFragment' };

export type Regular_UserFragment = {
	__typename?: 'User';
	id: number;
	username: string;
	email: string;
} & { ' $fragmentName'?: 'Regular_UserFragment' };

export type ChangePasswordMutationVariables = Exact<{
	token: Scalars['String'];
	newPassword: Scalars['String'];
}>;

export type ChangePasswordMutation = {
	__typename?: 'Mutation';
	changePassword: {
		__typename?: 'UserResponseType';
		errors?: Array<
			{ __typename?: 'FieldError' } & {
				' $fragmentRefs'?: {
					Regular_ErrorFragment: Regular_ErrorFragment;
				};
			}
		> | null;
		user?:
			| ({ __typename?: 'User' } & {
					' $fragmentRefs'?: {
						Regular_UserFragment: Regular_UserFragment;
					};
			  })
			| null;
	};
};

export type CreatePostMutationVariables = Exact<{
	input: PostInputType;
}>;

export type CreatePostMutation = {
	__typename?: 'Mutation';
	createPost: {
		__typename?: 'Post';
		id: number;
		title: string;
		description: string;
		points: number;
		creator_id: number;
		created_at: string;
		updated_at: string;
	};
};

export type DeletePostMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeletePostMutation = {
	__typename?: 'Mutation';
	deletePost: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
	email: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
	__typename?: 'Mutation';
	forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
	usernameOrEmail: Scalars['String'];
	password: Scalars['String'];
}>;

export type LoginMutation = {
	__typename?: 'Mutation';
	login: {
		__typename?: 'UserResponseType';
		errors?: Array<
			{ __typename?: 'FieldError' } & {
				' $fragmentRefs'?: {
					Regular_ErrorFragment: Regular_ErrorFragment;
				};
			}
		> | null;
		user?:
			| ({ __typename?: 'User' } & {
					' $fragmentRefs'?: {
						Regular_UserFragment: Regular_UserFragment;
					};
			  })
			| null;
	};
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
	options: UsernamePasswordInputType;
}>;

export type RegisterMutation = {
	__typename?: 'Mutation';
	register: {
		__typename?: 'UserResponseType';
		errors?: Array<
			{ __typename?: 'FieldError' } & {
				' $fragmentRefs'?: {
					Regular_ErrorFragment: Regular_ErrorFragment;
				};
			}
		> | null;
		user?:
			| ({ __typename?: 'User' } & {
					' $fragmentRefs'?: {
						Regular_UserFragment: Regular_UserFragment;
					};
			  })
			| null;
	};
};

export type VoteMutationVariables = Exact<{
	post_id: Scalars['Int'];
	value: Scalars['Int'];
}>;

export type VoteMutation = { __typename?: 'Mutation'; vote: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
	__typename?: 'Query';
	me?:
		| ({ __typename?: 'User' } & {
				' $fragmentRefs'?: {
					Regular_UserFragment: Regular_UserFragment;
				};
		  })
		| null;
};

export type PostQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type PostQuery = {
	__typename?: 'Query';
	post?: {
		__typename?: 'Post';
		id: number;
		title: string;
		points: number;
		descriptionSnippet: string;
		created_at: string;
		updated_at: string;
		vote_status?: number | null;
		creator: { __typename?: 'User'; username: string; id: number };
	} | null;
};

export type PostsQueryVariables = Exact<{
	limit: Scalars['Int'];
	cursor?: InputMaybe<Scalars['String']>;
}>;

export type PostsQuery = {
	__typename?: 'Query';
	posts: {
		__typename?: 'PaginatedPosts';
		hasMore: boolean;
		posts: Array<{
			__typename?: 'Post';
			id: number;
			title: string;
			points: number;
			descriptionSnippet: string;
			created_at: string;
			updated_at: string;
			vote_status?: number | null;
			creator: { __typename?: 'User'; username: string; id: number };
		}>;
	};
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type FieldError = {
	__typename?: 'FieldError';
	field: Scalars['String'];
	message: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	changePassword: UserResponseType;
	createPost: Post;
	deletePost: Scalars['Boolean'];
	forgotPassword: Scalars['Boolean'];
	login: UserResponseType;
	logout: Scalars['Boolean'];
	register: UserResponseType;
	updatePost?: Maybe<Post>;
	vote: Scalars['Boolean'];
};

export type MutationChangePasswordArgs = {
	newPassword: Scalars['String'];
	token: Scalars['String'];
};

export type MutationCreatePostArgs = {
	input: PostInputType;
};

export type MutationDeletePostArgs = {
	id: Scalars['Int'];
};

export type MutationForgotPasswordArgs = {
	email: Scalars['String'];
};

export type MutationLoginArgs = {
	password: Scalars['String'];
	usernameOrEmail: Scalars['String'];
};

export type MutationRegisterArgs = {
	options: UsernamePasswordInputType;
};

export type MutationUpdatePostArgs = {
	description: Scalars['String'];
	id: Scalars['Float'];
	title: Scalars['String'];
};

export type MutationVoteArgs = {
	post_id: Scalars['Int'];
	value: Scalars['Int'];
};

export type PaginatedPosts = {
	__typename?: 'PaginatedPosts';
	hasMore: Scalars['Boolean'];
	posts: Array<Post>;
};

export type Post = {
	__typename?: 'Post';
	created_at: Scalars['String'];
	creator: User;
	creator_id: Scalars['Float'];
	description: Scalars['String'];
	descriptionSnippet: Scalars['String'];
	id: Scalars['Float'];
	points: Scalars['Float'];
	title: Scalars['String'];
	updated_at: Scalars['String'];
	vote_status?: Maybe<Scalars['Int']>;
};

export type PostInputType = {
	description: Scalars['String'];
	title: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	hello: Scalars['String'];
	me?: Maybe<User>;
	post?: Maybe<Post>;
	posts: PaginatedPosts;
};

export type QueryPostArgs = {
	id: Scalars['Int'];
};

export type QueryPostsArgs = {
	cursor?: InputMaybe<Scalars['String']>;
	limit: Scalars['Int'];
};

export type User = {
	__typename?: 'User';
	created_at: Scalars['String'];
	email: Scalars['String'];
	id: Scalars['Float'];
	updated_at: Scalars['String'];
	username: Scalars['String'];
};

export type UserResponseType = {
	__typename?: 'UserResponseType';
	errors?: Maybe<Array<FieldError>>;
	user?: Maybe<User>;
};

export type UsernamePasswordInputType = {
	email: Scalars['String'];
	password: Scalars['String'];
	username: Scalars['String'];
};

export const Regular_ErrorFragmentDoc = gql`
	fragment regular_error on FieldError {
		field
		message
	}
`;
export const Regular_PostFragmentDoc = gql`
	fragment regular_post on Post {
		id
		title
		description
		points
		creator_id
		created_at
		updated_at
		creator {
			id
			username
		}
	}
`;
export const Regular_UserFragmentDoc = gql`
	fragment regular_user on User {
		id
		username
		email
	}
`;
export const ChangePasswordDocument = gql`
	mutation ChangePassword($token: String!, $newPassword: String!) {
		changePassword(token: $token, newPassword: $newPassword) {
			errors {
				...regular_error
			}
			user {
				...regular_user
			}
		}
	}
	${Regular_ErrorFragmentDoc}
	${Regular_UserFragmentDoc}
`;

export function useChangePasswordMutation() {
	return Urql.useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(ChangePasswordDocument);
}
export const CreatePostDocument = gql`
	mutation CreatePost($input: PostInputType!) {
		createPost(input: $input) {
			id
			title
			description
			points
			creator_id
			created_at
			updated_at
		}
	}
`;

export function useCreatePostMutation() {
	return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
		CreatePostDocument
	);
}
export const DeletePostDocument = gql`
	mutation DeletePost($id: Int!) {
		deletePost(id: $id)
	}
`;

export function useDeletePostMutation() {
	return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(
		DeletePostDocument
	);
}
export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;

export function useForgotPasswordMutation() {
	return Urql.useMutation<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>(ForgotPasswordDocument);
}
export const LoginDocument = gql`
	mutation Login($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			errors {
				...regular_error
			}
			user {
				...regular_user
			}
		}
	}
	${Regular_ErrorFragmentDoc}
	${Regular_UserFragmentDoc}
`;

export function useLoginMutation() {
	return Urql.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument
	);
}
export const LogoutDocument = gql`
	mutation Logout {
		logout
	}
`;

export function useLogoutMutation() {
	return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
		LogoutDocument
	);
}
export const RegisterDocument = gql`
	mutation Register($options: UsernamePasswordInputType!) {
		register(options: $options) {
			errors {
				...regular_error
			}
			user {
				...regular_user
			}
		}
	}
	${Regular_ErrorFragmentDoc}
	${Regular_UserFragmentDoc}
`;

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument
	);
}
export const VoteDocument = gql`
	mutation Vote($post_id: Int!, $value: Int!) {
		vote(post_id: $post_id, value: $value)
	}
`;

export function useVoteMutation() {
	return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
}
export const MeDocument = gql`
	query Me {
		me {
			...regular_user
		}
	}
	${Regular_UserFragmentDoc}
`;

export function useMeQuery(
	options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>
) {
	return Urql.useQuery<MeQuery, MeQueryVariables>({
		query: MeDocument,
		...options
	});
}
export const PostDocument = gql`
	query Post($id: Int!) {
		post(id: $id) {
			id
			title
			points
			descriptionSnippet
			created_at
			updated_at
			vote_status
			creator {
				username
				id
			}
		}
	}
`;

export function usePostQuery(
	options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>
) {
	return Urql.useQuery<PostQuery, PostQueryVariables>({
		query: PostDocument,
		...options
	});
}
export const PostsDocument = gql`
	query Posts($limit: Int!, $cursor: String) {
		posts(limit: $limit, cursor: $cursor) {
			posts {
				id
				title
				points
				descriptionSnippet
				created_at
				updated_at
				vote_status
				creator {
					username
					id
				}
			}
			hasMore
		}
	}
`;

export function usePostsQuery(
	options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>
) {
	return Urql.useQuery<PostsQuery, PostsQueryVariables>({
		query: PostsDocument,
		...options
	});
}
