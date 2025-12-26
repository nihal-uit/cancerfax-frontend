const webpack = require('webpack');

const path = require('path');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util"),
    "crypto": false,
    "assert": false,
    "http": false,
    "http2": false,
    "https": false,
    "os": false,
    "url": false,
    "zlib": false
  });
  config.resolve.fallback = fallback;
  
  // Ensure resolve object exists
  if (!config.resolve) {
    config.resolve = {};
  }
  
  // Add path alias for @ to point to src directory
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '@': path.resolve(__dirname, 'src')
  };
  
  // Ensure .tsx and .ts extensions are resolved
  if (!config.resolve.extensions) {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
  }
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  });
  return config;
}


