/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type RegisterMutationVariables = Exact<{
	username: Scalars['String'];
	password: Scalars['String'];
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

export const Regular_UserFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'regular_user' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'User' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'username' } }
				]
			}
		}
	]
} as unknown as DocumentNode<Regular_UserFragment, unknown>;
export const LoginDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Login' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'username' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					}
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'password' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'options' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'username'
											},
											value: {
												kind: 'Variable',
												name: {
													kind: 'Name',
													value: 'username'
												}
											}
										},
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'password'
											},
											value: {
												kind: 'Variable',
												name: {
													kind: 'Name',
													value: 'password'
												}
											}
										}
									]
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'errors' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'field'
												}
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'message'
												}
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'FragmentSpread',
												name: {
													kind: 'Name',
													value: 'regular_user'
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...Regular_UserFragmentDoc.definitions
	]
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Logout' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'logout' } }
				]
			}
		}
	]
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Register' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'username' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					}
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'password' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'register' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'options' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'username'
											},
											value: {
												kind: 'Variable',
												name: {
													kind: 'Name',
													value: 'username'
												}
											}
										},
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'password'
											},
											value: {
												kind: 'Variable',
												name: {
													kind: 'Name',
													value: 'password'
												}
											}
										}
									]
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'errors' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'field'
												}
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'message'
												}
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'FragmentSpread',
												name: {
													kind: 'Name',
													value: 'regular_user'
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...Regular_UserFragmentDoc.definitions
	]
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Me' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'me' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: {
										kind: 'Name',
										value: 'regular_user'
									}
								}
							]
						}
					}
				]
			}
		},
		...Regular_UserFragmentDoc.definitions
	]
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const PostsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Posts' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'posts' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'id' }
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'title' }
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'created_at' }
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'updated_at' }
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */

export type Mutation = {
	__typename?: 'Mutation';
	createPost: Post;
	deletePost: Scalars['Boolean'];
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

export type MutationLoginArgs = {
	options: UsernamePasswordInputType;
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
	password: Scalars['String'];
	username: Scalars['String'];
};

export type Regular_UserFragment = {
	__typename?: 'User';
	id: number;
	username: string;
} & { ' $fragmentName'?: 'Regular_UserFragment' };

export type LoginMutationVariables = Exact<{
	username: Scalars['String'];
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

export function useLoginMutation() {
	return Urql.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument
	);
}

export function useLogoutMutation() {
	return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
		LogoutDocument
	);
}

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument
	);
}

export function useMeQuery(
	options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>
) {
	return Urql.useQuery<MeQuery, MeQueryVariables>({
		query: MeDocument,
		...options
	});
}

export function usePostsQuery(
	options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>
) {
	return Urql.useQuery<PostsQuery, PostsQueryVariables>({
		query: PostsDocument,
		...options
	});
}
