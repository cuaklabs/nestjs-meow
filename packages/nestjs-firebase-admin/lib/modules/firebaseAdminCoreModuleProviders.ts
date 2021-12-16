/* eslint-disable import/no-unresolved */
import { Provider } from '@nestjs/common';
import { AppCheck, getAppCheck } from 'firebase-admin/app-check';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { getInstallations, Installations } from 'firebase-admin/installations';
import { getMachineLearning, MachineLearning } from 'firebase-admin/machine-learning';
import { getMessaging, Messaging } from 'firebase-admin/messaging';
import { getProjectManagement, ProjectManagement } from 'firebase-admin/project-management';
import { getRemoteConfig, RemoteConfig } from 'firebase-admin/remote-config';
import { getSecurityRules, SecurityRules } from 'firebase-admin/security-rules';
import { getStorage, Storage } from 'firebase-admin/storage';

import { AppInitializer } from './AppInitializer';
import { FirebaseProviderInstance } from './FirebaseProviderType';

export const providers: Provider<FirebaseProviderInstance>[] = [
  {
    inject: [AppInitializer],
    provide: Auth,
    useFactory: (appInitializer: AppInitializer): Auth => {
      appInitializer.initialize();
      return getAuth();
    },
  },
  {
    inject: [AppInitializer],
    provide: Firestore,
    useFactory: (appInitializer: AppInitializer): Firestore => {
      appInitializer.initialize();
      return getFirestore();
    },
  },
  {
    inject: [AppInitializer],
    provide: Messaging,
    useFactory: (appInitializer: AppInitializer): Messaging => {
      appInitializer.initialize();
      return getMessaging();
    },
  },
  {
    inject: [AppInitializer],
    provide: AppCheck,
    useFactory: (appInitializer: AppInitializer): AppCheck => {
      appInitializer.initialize();
      return getAppCheck();
    },
  },
  {
    inject: [AppInitializer],
    provide: Installations,
    useFactory: (appInitializer: AppInitializer): Installations => {
      appInitializer.initialize();
      return getInstallations();
    },
  },
  {
    inject: [AppInitializer],
    provide: MachineLearning,
    useFactory: (appInitializer: AppInitializer): MachineLearning => {
      appInitializer.initialize();
      return getMachineLearning();
    },
  },
  {
    inject: [AppInitializer],
    provide: ProjectManagement,
    useFactory: (appInitializer: AppInitializer): ProjectManagement => {
      appInitializer.initialize();
      return getProjectManagement();
    },
  },
  {
    inject: [AppInitializer],
    provide: RemoteConfig,
    useFactory: (appInitializer: AppInitializer): RemoteConfig => {
      appInitializer.initialize();
      return getRemoteConfig();
    },
  },
  {
    inject: [AppInitializer],
    provide: SecurityRules,
    useFactory: (appInitializer: AppInitializer): SecurityRules => {
      appInitializer.initialize();
      return getSecurityRules();
    },
  },
  {
    inject: [AppInitializer],
    provide: Storage,
    useFactory: (appInitializer: AppInitializer): Storage => {
      appInitializer.initialize();
      return getStorage();
    },
  },
];
