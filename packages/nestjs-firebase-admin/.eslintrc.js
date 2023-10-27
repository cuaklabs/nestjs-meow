/** @type { import("eslint").ESLint.ConfigData } */
module.exports = {
  extends: '@cuaklabs/eslint-config-nestjs',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
