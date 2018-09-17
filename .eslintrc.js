module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:react/recommended"
    ],
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": 0,
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    }
};