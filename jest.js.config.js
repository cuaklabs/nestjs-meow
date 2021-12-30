const { getJestJsProjectConfig, getJsTestMatch } = require('./jest.config.base');

const firebaseAdminJsUnitProject = getJestJsProjectConfig(
  'FirebaseAdmin-Unit',
  ['/node_modules', '.int.spec.js'],
  'nestjs-firebase-admin',
  '.spec.js',
);

const firebaseAdminJsIntegrationProject = getJestJsProjectConfig(
  'FirebaseAdmin-Integration',
  ['/node_modules'],
  'nestjs-firebase-admin',
  '.int.spec.js',
);

const jsUnitProject = getJestJsProjectConfig('Unit', ['/node_modules', '.int.spec.js'], undefined, '.spec.js');

const jsIntegrationProject = getJestJsProjectConfig('Integration', ['/node_modules'], undefined, '.int.spec.js');

module.exports = {
  projects: [firebaseAdminJsIntegrationProject, firebaseAdminJsUnitProject, jsIntegrationProject, jsUnitProject],
};
