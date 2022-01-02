const tsRoot = '<rootDir>/packages';
const jsRoot = '<rootDir>/dist';

function getJestProjectConfig(projectName, collectCoverageFrom, roots, testMatch, testPathIgnorePatterns) {
  const projectConfig = {
    displayName: projectName,
    collectCoverageFrom: collectCoverageFrom,
    coveragePathIgnorePatterns: ['/node_modules/', '/fixtures/'],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    resolver: '<rootDir>/config/jest/jest-resolver.js',
    rootDir: '.',
    roots: roots,
    testEnvironment: 'node',
    testMatch: testMatch,
    testPathIgnorePatterns: testPathIgnorePatterns,
  };

  return projectConfig;
}

function getJestJsProjectConfig(projectName, testPathIgnorePatterns, submodule, extension) {
  const testMatch = [getJsTestMatch(submodule, extension)];
  const collectCoverageFrom = [`${getJestJsProjectRoot(submodule)}/**/*.js`];

  return getJestProjectConfig(
    projectName,
    collectCoverageFrom,
    [getJestJsProjectRoot(submodule)],
    testMatch,
    testPathIgnorePatterns,
  );
}

function getJestJsProjectRoot(submodule) {
  return getJestProjectRoot(jsRoot, submodule);
}

function getJestProjectRoot(root, submodule) {
  let projectRoots;

  if (submodule === undefined) {
    projectRoots = root;
  } else {
    projectRoots = `${root}/${submodule}`;
  }

  return projectRoots;
}

function getJestTsProjectConfig(projectName, testPathIgnorePatterns, submodule, extension) {
  const testMatch = [getTsTestMatch(submodule, extension)];
  const collectCoverageFrom = [`${getJestTsProjectRoot(submodule)}/**/*.ts`];

  return {
    ...getJestProjectConfig(
      projectName,
      collectCoverageFrom,
      [getJestTsProjectRoot(submodule)],
      testMatch,
      testPathIgnorePatterns,
    ),
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
  };
}

function getJestTsProjectRoot(submodule) {
  return getJestProjectRoot(tsRoot, submodule);
}

function getSubmoduleTestMatch(root, submoduleName, testExtension) {
  let testMatch;

  if (submoduleName === undefined) {
    testMatch = `${root}/**/*${testExtension}`;
  } else {
    testMatch = `${root}/${submoduleName}/**/*${testExtension}`;
  }

  return testMatch;
}

function getTsTestMatch(submoduleName, testExtension) {
  return getSubmoduleTestMatch(tsRoot, submoduleName, testExtension);
}

function getJsTestMatch(submoduleName, testExtension) {
  return getSubmoduleTestMatch(jsRoot, submoduleName, testExtension);
}

module.exports = {
  getJestProjectConfig,
  getJestJsProjectConfig,
  getJsTestMatch,
  getTsTestMatch,
  getJestTsProjectConfig,
};
