module.exports = {
	env: {
		es6: true,
		browser: true
	},
	extends: ['plugin:react/recommended', 'eslint:recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		require: true,
		process: true,
		module: true
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'no-unused-vars': 'warn',
		'react/prop-types': 0,
		'react/display-name': 0
	}
};
