import { dedupExchange, fetchExchange, gql } from '@urql/core';
import { Resolver, cacheExchange, Cache } from '@urql/exchange-graphcache';
import { Exchange, stringifyVariables } from 'urql';
import Router from 'next/router';
import { pipe, tap } from 'wonka';

import {
	LoginMutation,
	MeQuery,
	MeDocument,
	RegisterMutation,
	LogoutMutation,
	VoteMutationVariables,
	DeletePostMutationVariables
} from '../gql/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import { isServer } from './isServer';

const invalidateAllPosts = (cache: Cache) => {
	const allFields = cache.inspectFields('Query');
	const fieldInfos = allFields.filter((info) => info.fieldName === 'posts');
	fieldInfos.forEach((field) => {
		cache.invalidate('Query', 'posts', field.arguments);
	});
};

const errorExchange: Exchange =
	({ forward }) =>
	(ops$) => {
		return pipe(
			forward(ops$),
			tap(({ error }) => {
				if (error?.message.includes('not authenticated')) {
					Router.replace('/login');
				}
			})
		);
	};

const cursorPagination = (): Resolver => {
	return (_parent, fieldArgs, cache, info) => {
		const { parentKey: entityKey, fieldName } = info;
		const allFields = cache.inspectFields(entityKey);
		const fieldInfos = allFields.filter(
			(info) => info.fieldName === fieldName
		);
		const size = fieldInfos.length;
		if (size === 0) {
			return undefined;
		}

		const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
		const isItInTheCache = cache.resolve(
			cache.resolve(entityKey, fieldKey) as string,
			'posts'
		);
		info.partial = !isItInTheCache;
		let hasMore = true;
		const results: string[] = [];
		fieldInfos.forEach((fi) => {
			const key = cache.resolve(entityKey, fi.fieldKey) as string;
			const data = cache.resolve(key, 'posts') as string[];
			const _hasMore = cache.resolve(key, 'hasMore');
			if (!_hasMore) {
				hasMore = _hasMore as boolean;
			}
			results.push(...data);
		});

		return {
			__typename: 'PaginatedPosts',
			hasMore,
			posts: results
		};
	};
};
export const createUrqlClient = (ssrExchange: any, ctx: any) => {
	let cookieValue = '';
	if (isServer() && ctx?.req.headers.cookie) {
		cookieValue = ctx.req.headers.cookie?.split(';')[4]?.trim();
	}

	return {
		url: process.env.NEXT_PUBLIC_API_URL,
		fetchOptions: {
			credentials: 'include' as const,
			headers: {
				cookie: cookieValue ? cookieValue : undefined,
				crossDomain: true,
			}
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				keys: { PaginatedPosts: () => null },
				resolvers: {
					Query: {
						posts: cursorPagination()
					}
				},
				updates: {
					Mutation: {
						vote: (_result, args, cache, info) => {
							const { post_id, value } =
								args as VoteMutationVariables;
							const data = cache.readFragment(
								gql`
									fragment _ on Post {
										id
										points
										vote_status
									}
								`,
								{ id: post_id }
							);

							if (data) {
								if (data.vote_status === value) {
									return;
								}
								const newPoints =
									data.points +
									(!data.vote_status ? 1 : 2) * value;
								cache.writeFragment(
									gql`
										fragment _ on Post {
											points
											vote_status
										}
									`,
									{
										id: post_id,
										points: newPoints,
										vote_status: value
									}
								);
							}
						},
						createPost: (_result, args, cache, info) => {
							invalidateAllPosts(cache);
						},
						deletePost: (_result, args, cache, info) => {
							cache.invalidate({
								__typename: 'Post',
								id: (args as DeletePostMutationVariables).id
							});
						},
						login: (_result, args, cache, info) => {
							betterUpdateQuery<LoginMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								(result, query) => {
									if (result.login.errors) {
										return query;
									} else {
										return { me: result.login.user };
									}
								}
							);
							invalidateAllPosts(cache);
						},
						register: (_result, args, cache, info) => {
							betterUpdateQuery<RegisterMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								(result, query) => {
									if (result.register.errors) {
										return query;
									} else {
										return { me: result.register.user };
									}
								}
							);
						},
						logout: (_result, args, cache, info) => {
							betterUpdateQuery<LogoutMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								() => ({ me: null })
							);
						}
					}
				}
			}),
			errorExchange,
			ssrExchange,
			fetchExchange
		]
	};
};
