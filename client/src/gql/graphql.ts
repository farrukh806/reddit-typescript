/* eslint-disable */
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
	createPost: Post;
	deletePost: Scalars['Boolean'];
	forgotPassword: Scalars['Boolean'];
	login: UserResponseType;
	logout: Scalars['Boolean'];
	register: UserResponseType;
	updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
	description: Scalars['String'];
	title: Scalars['String'];
};

export type MutationDeletePostArgs = {
	id: Scalars['Float'];
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

export type Post = {
	__typename?: 'Post';
	created_at: Scalars['String'];
	description: Scalars['String'];
	id: Scalars['Int'];
	title: Scalars['String'];
	updated_at: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	hello: Scalars['String'];
	me?: Maybe<User>;
	post?: Maybe<Post>;
	posts: Array<Post>;
};

export type QueryPostArgs = {
	id: Scalars['Float'];
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

export type Regular_UserFragment = {
	__typename?: 'User';
	id: number;
	username: string;
	email: string;
} & { ' $fragmentName'?: 'Regular_UserFragment' };

export type LoginMutationVariables = Exact<{
	usernameOrEmail: Scalars['String'];
	password: Scalars['String'];
}>;

export type LoginMutation = {
	__typename?: 'Mutation';
	login: {
		__typename?: 'UserResponseType';
		errors?: Array<{
			__typename?: 'FieldError';
			field: string;
			message: string;
		}> | null;
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
		errors?: Array<{
			__typename?: 'FieldError';
			field: string;
			message: string;
		}> | null;
		user?:
			| ({ __typename?: 'User' } & {
					' $fragmentRefs'?: {
						Regular_UserFragment: Regular_UserFragment;
					};
			  })
			| null;
	};
};

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

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
	__typename?: 'Query';
	posts: Array<{
		__typename?: 'Post';
		id: number;
		title: string;
		created_at: string;
		updated_at: string;
	}>;
};

export const Regular_UserFragmentDoc = gql`
	fragment regular_user on User {
		id
		username
		email
	}
`;
export const LoginDocument = gql`
	mutation Login($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			errors {
				field
				message
			}
			user {
				...regular_user
			}
		}
	}
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
				field
				message
			}
			user {
				...regular_user
			}
		}
	}
	${Regular_UserFragmentDoc}
`;

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument
	);
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
export const PostsDocument = gql`
	query Posts {
		posts {
			id
			title
			created_at
			updated_at
		}
	}
`;

export function usePostsQuery(
	options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>
) {
	return Urql.useQuery<PostsQuery, PostsQueryVariables>({
		query: PostsDocument,
		...options
	});
}
