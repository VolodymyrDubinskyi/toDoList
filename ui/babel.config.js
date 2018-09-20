module.exports = (api) => {
  const presets = ['@babel/env', '@babel/preset-react', '@babel/preset-flow']
  const plugins = ['@babel/plugin-proposal-class-properties']
  api.cache(true)
  return {
    presets,
    plugins,
  }
}
