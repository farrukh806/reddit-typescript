import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://reddit-test-cc0ur1d9s-farrukh806.vercel.app/',
	documents: 'src/graphql/**/*.graphql',
	generates: {
		'src/gql/': {
			preset: 'client',
			plugins: ['typescript', 'typescript-urql']
		}
	}
};

export default config;
