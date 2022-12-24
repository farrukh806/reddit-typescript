/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment regular_error on FieldError {\n  field\n  message\n}": types.Regular_ErrorFragmentDoc,
    "fragment regular_post on Post {\n  id\n  title\n  description\n  points\n  creator_id\n  created_at\n  updated_at\n  creator {\n    id\n    username\n  }\n}": types.Regular_PostFragmentDoc,
    "fragment regular_user on User {\n  id\n  username\n  email\n}": types.Regular_UserFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($input: PostInputType!) {\n  createPost(input: $input) {\n    id\n    title\n    description\n    points\n    creator_id\n    created_at\n    updated_at\n  }\n}": types.CreatePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: UsernamePasswordInputType!) {\n  register(options: $options) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}": types.RegisterDocument,
    "mutation Vote($post_id: Int!, $value: Int!) {\n  vote(post_id: $post_id, value: $value)\n}": types.VoteDocument,
    "query Me {\n  me {\n    ...regular_user\n  }\n}": types.MeDocument,
    "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      id\n      title\n      points\n      descriptionSnippet\n      created_at\n      updated_at\n      creator {\n        username\n        id\n      }\n    }\n    hasMore\n  }\n}": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment regular_error on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment regular_error on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment regular_post on Post {\n  id\n  title\n  description\n  points\n  creator_id\n  created_at\n  updated_at\n  creator {\n    id\n    username\n  }\n}"): (typeof documents)["fragment regular_post on Post {\n  id\n  title\n  description\n  points\n  creator_id\n  created_at\n  updated_at\n  creator {\n    id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment regular_user on User {\n  id\n  username\n  email\n}"): (typeof documents)["fragment regular_user on User {\n  id\n  username\n  email\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: PostInputType!) {\n  createPost(input: $input) {\n    id\n    title\n    description\n    points\n    creator_id\n    created_at\n    updated_at\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInputType!) {\n  createPost(input: $input) {\n    id\n    title\n    description\n    points\n    creator_id\n    created_at\n    updated_at\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UsernamePasswordInputType!) {\n  register(options: $options) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}"): (typeof documents)["mutation Register($options: UsernamePasswordInputType!) {\n  register(options: $options) {\n    errors {\n      ...regular_error\n    }\n    user {\n      ...regular_user\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Vote($post_id: Int!, $value: Int!) {\n  vote(post_id: $post_id, value: $value)\n}"): (typeof documents)["mutation Vote($post_id: Int!, $value: Int!) {\n  vote(post_id: $post_id, value: $value)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...regular_user\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...regular_user\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      id\n      title\n      points\n      descriptionSnippet\n      created_at\n      updated_at\n      creator {\n        username\n        id\n      }\n    }\n    hasMore\n  }\n}"): (typeof documents)["query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      id\n      title\n      points\n      descriptionSnippet\n      created_at\n      updated_at\n      creator {\n        username\n        id\n      }\n    }\n    hasMore\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;