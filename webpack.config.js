const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		nextslide: path.resolve(__dirname, 'src', 'index.js')
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: '[name].bundle.js'
	},

	mode: process.env.NODE_ENV || 'development',

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [
					/node_modules/
				]
			},

			{
				test: /\.(png|jpe?g|gif|woff2?|otf|wav|ttf|eot|svg)(\?|\#.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'files/[name].[ext]?[hash]'
				}
			}
		]
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: process.env.NODE_ENV || 'development'
		})
	],

	devtool: '#eval-source-map'
};


if(process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	module.exports.optimization = {
		minimize: true
	};
}
