const { getJestTsProjectConfig } = require('./jest.config.base');

const firebaseAdminTsUnitProject = getJestTsProjectConfig(
  'FirebaseAdmin-Unit',
  ['/node_modules', '.int.spec.ts'],
  'nestjs-firebase-admin',
  '.spec.ts',
);

const firebaseAdminTsIntegrationProject = getJestTsProjectConfig(
  'FirebaseAdmin-Integration',
  ['/node_modules'],
  'nestjs-firebase-admin',
  '.int.spec.ts',
);

const tsUnitProject = getJestTsProjectConfig('Unit', ['/node_modules', '.int.spec.ts'], undefined, '.spec.ts');

const tsIntegrationProject = getJestTsProjectConfig('Integration', ['/node_modules'], undefined, '.int.spec.ts');

module.exports = {
  projects: [firebaseAdminTsIntegrationProject, firebaseAdminTsUnitProject, tsIntegrationProject, tsUnitProject],
};
