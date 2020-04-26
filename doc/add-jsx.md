# Add JSX loader to Angular project

> Based on:
> https://sdk.gooddata.com/gooddata-ui/docs/4.1.1/ht_use_react_component_in_angular_2.x.html

## Terminal actions:

```sh
# create a new project
ng new another-project
cd another-project
# This allows custom webpack configuration
npm i -D @angular-builders/custom-webpack
# React stuff
npm i react react-dom @babel/preset-react postcss-short
```

## Changes in files:

+ Change in `angular.json`
```js
{
  // ...
  "projects": {
    "ng-and-react": {
      // ...
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            // ...
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          },
          // ...
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            // ...
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          },
          // ...
        },
        // ...
      }
    }
  },
  // ...
}

```

+ Add `/webpack.config.js`
```js
module.exports = {
  module : {
    rules: [
      {
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test   : /\.scss$/,
        loader : 'postcss-loader',
        options: {
          ident  : 'postcss',
          plugins: () => [
            require('postcss-short')(),
          ]
        }
      }
    ]
  }
};
```

+ Change in `/tsconfig.json`
```js
{
  // ...
  "compilerOptions": {
    // ...
    "jsx": "react"
  }
}
```

+ Add `/.babelrc`
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
