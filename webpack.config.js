const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.tsx",
		content: "./src/scripts/content.ts",
		background: "./src/scripts/background.ts",
	},
	cache: false,
	mode: "production",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							compilerOptions: { noEmit: false },
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								ident: "postcss",
								plugins: [require("tailwindcss"), require("autoprefixer")],
							},
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "manifest.json", to: "../manifest.json" },
				{ from: "public/logo192.png", to: "../public/logo192.png" },
				{ from: "public/logo512.png", to: "../public/logo512.png" },
			],
		}),
		...getHtmlPlugins(["index"]),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@": path.resolve(__dirname, "."),
			"@/lib/utils": path.resolve(__dirname, "lib/utils"),
		},
	},
	output: {
		path: path.join(__dirname, "dist/js"),
		filename: "[name].js",
	},
};

function getHtmlPlugins(chunks) {
	return chunks.map(
		(chunk) =>
			new HTMLPlugin({
				title: "React extension",
				filename: `${chunk}.html`,
				chunks: [chunk],
			}),
	);
}
