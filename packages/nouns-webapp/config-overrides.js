const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    os: require.resolve('os-browserify/browser'),
    path: require.resolve('path-browserify'),
    fs: false,
    process: require.resolve('process/browser'),
  };

  // Add alias to handle ESM module resolution
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser'),
  };

  // Handle ESM modules properly
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
    resolve: {
      fullySpecified: false,
    },
  });

  // Fix ESM module resolution issues
  config.resolve.extensions = [...(config.resolve.extensions || []), '.mjs'];
  config.resolve.mainFields = ['browser', 'module', 'main'];

  // Define process global for browser compatibility
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  // Ignore uvu testing library in browser bundle
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /^uvu$/,
      contextRegExp: /micromark/,
    })
  );

  // Add SVGR loader for SVG files
  const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
  if (fileLoaderRule) {
    fileLoaderRule.exclude = /\.svg$/;
  }

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          throwIfNamespace: false,
        },
      },
    ],
  });

  // Suppress source map warnings for @davatar/react
  config.module.rules.push({
    test: /\.js$/,
    enforce: 'pre',
    include: /node_modules\/@davatar\/react/,
    use: {
      loader: 'source-map-loader',
      options: {
        filterSourceMappingUrl: () => false,
      },
    },
  });

  return config;
};
