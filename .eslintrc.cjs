// module.exports = {
//     env: {
//         browser: true,
//         es2021: true
//     },
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:vue/vue3-essential'
//     ],
//     overrides: [
//         {
//             env: {
//                 node: true
//             },
//             files: ['.eslintrc.{js,cjs}'],
//             parserOptions: {
//                 sourceType: 'script'
//             }
//         }
//     ],
//     parserOptions: {
//         ecmaVersion: 'latest',
//         parser: '@typescript-eslint/parser',
//         sourceType: 'module'
//     },
//     plugins: ['@typescript-eslint', 'vue'],
//     rules: {}
// };
// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended'
    ],
    // 参考vue官方推荐,替换默认parser
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true
        },
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
