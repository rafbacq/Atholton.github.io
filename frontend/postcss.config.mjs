/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // this is v important pls don't delete it broke everything
    'postcss-flexbugs-fixes': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-preset-env': {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
            },
          },
        }
      : {}),
  },
}
