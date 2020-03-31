const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js", // entry point to the application = top react component,
    output: {
        path: path.resolve(__dirname, "build"), // path where the transformed index.js will be stored
        filename: "index_bundle.js", //name of the transformed file
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx)$/, use: {
                    loader: 'babel-loader',
                }
            }, // what files will be loaded by what procedure
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html" // will take the template file and transform it to include the rest
        }),
    ]
};