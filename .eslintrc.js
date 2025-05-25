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
				devDependencies: ['**/__tests__/*']
			}
		],
		'import/no-unresolved': 'error',
		'jest/consistent-test-it': ['error'],
		'jest/no-deprecated-functions': 'warn',
		'jest/no-duplicate-hooks': 'error',
		'jest/no-test-return-statement': 'error',
		'jest/prefer-hooks-on-top': 'error',
		'jest/prefer-lowercase-title': [
			'error',
			{
				ignore: ['test'],
				ignoreTopLevelDescribe: true
			}
		],
		'jest/require-top-level-describe': 'error',
		'jsdoc/require-jsdoc': 'off',
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
		'no-use-before-define': 'off',
		'prefer-rest-params': 'off',
		'prefer-spread': 'off',
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
