const path = require('node:path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')], // not working, don't know why
  },
  // https://stackoverflow.com/a/74083640 (converts css names to camelCase)
  webpack(config) {
    config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf
      .filter((rule) => Array.isArray(rule.use))
      .flatMap(rule => rule.use)
      .forEach((moduleLoader) => {
        if (moduleLoader.loader?.includes('css-loader') && typeof moduleLoader.options.modules === 'object') {
          moduleLoader.options.modules.exportLocalsConvention = 'camelCase';
        }
      });

    return config;
  }
}

module.exports = nextConfig
