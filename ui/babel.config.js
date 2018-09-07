module.exports = (api) => {
  const presets = ['@babel/env', '@babel/preset-react']
  const plugins = ['@babel/plugin-proposal-class-properties']
  api.cache(true)
  return {
    presets,
    plugins,
  }
}
