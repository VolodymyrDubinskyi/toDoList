module.exports = (api) => {
  const presets = ['@babel/env']
  const plugins = ['@babel/plugin-proposal-class-properties']
  api.cache(true)
  return {
    presets,
    plugins,
  }
}
