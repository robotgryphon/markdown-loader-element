import { Configuration } from "webpack";

let c: Configuration = {
    entry: {
        "markdown-loader": "./source/markdown-loader.ts"
    },
    
    output: {
        filename: "[name].js"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    }
};

export default c;