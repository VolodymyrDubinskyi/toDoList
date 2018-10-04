module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "semi": 0,
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
    },
    "parser": 'babel-eslint',
    "env": {
        "browser": true,
        "node": true,
    }
};