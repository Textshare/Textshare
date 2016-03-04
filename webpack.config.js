var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "app": ["./web/frontend/react/index.js"],
  },

  output: {
    path: "./priv/static",
    filename: "js/app.js"
  },

  resolve: {
    modulesDirectories: [
      "node_modules",
      __dirname + "/web/frontend"
    ],
    alias: {
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js",
      phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js"
    },
    extensions: ["", ".js", ".json", ".css", ".scss"]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass?includePaths[]=" + __dirname +  "/node_modules"
        )
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("css/app.css"),
    new CopyWebpackPlugin([{ from: "./web/frontend/assets" }])
  ]
}
