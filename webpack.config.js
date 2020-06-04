const path = require('path');

module.exports = {
	entry: path.join(__dirname, '/tic-tac-toe.ts'),
	output: {
		filename: 'tic-tac-toe.js',
		path: __dirname
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss?$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.css', '.scss' ]
	}
};
