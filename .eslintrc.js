module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	plugins: ['@typescript-eslint', 'import', 'jest', 'jsdoc'],
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'plugin:jsdoc/recommended',
		'prettier'
	],
	rules: {
		'@typescript-eslint/member-ordering': ['warn'],
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ classes: false, functions: false }
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{ ts: 'never', tsx: 'never' }
		],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: ['**/*.{setup,spec,test}.*']
			}
		],
		'import/no-unresolved': 'error',
		'jest/consistent-test-it': ['error'],
		'jest/lowercase-name': [
			'error',
			{
				ignore: ['test'],
				ignoreTopLevelDescribe: true
			}
		],
		'jest/no-deprecated-functions': 'warn',
		'jest/no-duplicate-hooks': 'error',
		'jest/no-test-return-statement': 'error',
		'jest/prefer-hooks-on-top': 'error',
		'jest/require-top-level-describe': 'error',
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-use-before-define': 'off',
		'prefer-template': 'off'
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	}
};
