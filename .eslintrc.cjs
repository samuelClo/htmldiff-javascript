/* eslint-env node */

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	parserOptions: {
		project: true,
		ecmaVersion: 'latest',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false,
			},
		],
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
	},
}
