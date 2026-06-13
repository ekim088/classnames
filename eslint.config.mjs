import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(['lib/**', 'coverage/**', '.yarn/**', '**/*.{js,cjs,mjs}']),
	js.configs.recommended,
	tseslint.configs.recommended,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	jsdoc.configs['flat/recommended-typescript'],
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.eslint.json',
				tsconfigRootDir: import.meta.dirname
			}
		},
		settings: {
			'import/resolver': {
				typescript: { alwaysTryTypes: true }
			}
		},
		rules: {
			'@typescript-eslint/member-ordering': 'warn',
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
				{ devDependencies: ['**/__tests__/*'] }
			],
			'import/no-unresolved': 'error',
			'jsdoc/require-jsdoc': 'off',
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
			'no-use-before-define': 'off',
			'prefer-rest-params': 'off',
			'prefer-spread': 'off',
			'prefer-template': 'off'
		}
	},
	{
		files: ['**/__tests__/**/*.ts'],
		plugins: { jest },
		languageOptions: {
			globals: jest.environments.globals.globals
		},
		rules: {
			...jest.configs['flat/recommended'].rules,
			...jest.configs['flat/style'].rules,
			'jest/consistent-test-it': 'error',
			'jest/no-deprecated-functions': 'warn',
			'jest/no-duplicate-hooks': 'error',
			'jest/no-test-return-statement': 'error',
			'jest/prefer-hooks-on-top': 'error',
			'jest/prefer-lowercase-title': [
				'error',
				{ ignore: ['test'], ignoreTopLevelDescribe: true }
			],
			'jest/require-top-level-describe': 'error'
		}
	},
	eslintConfigPrettier
]);
