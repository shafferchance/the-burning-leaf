const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    console.log(env.SERVICE_URL);
    return {
        devtool: "sourcemap",
        entry: {
            main: "./src/index.js",
        },
        output: {
            path: path.join(__dirname, "build"),
            filename: "bundle.js",
            sourceMapFilename: "bundle.map",
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "html-loader",
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(jpeg|jpg|png|gif|svg)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "file-loader",
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/assets/base.html",
                filename: "index.html",
            }),
            new webpack.DefinePlugin({
                SERVICE_URL: JSON.stringify(env.SERVICE_URL),
            }),
        ],
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devServer: {
            contentBase: path.join(__dirname, "build"),
            compress: true,
            port: 9000,
            host: "0.0.0.0",
            historyApiFallback: {
                index: "/",
            },
        },
    };
};
