/* eslint-disable import/no-unresolved */
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

import { IdFirebaseBuilderPair } from '../models/IdFirebaseBuilderPair';

export const idFirebaseBuilderPairs: IdFirebaseBuilderPair[] = [
  {
    builder: getAuth,
    id: Auth,
  },
  {
    builder: getAppCheck,
    id: AppCheck,
  },
  {
    builder: getFirestore,
    id: Firestore,
  },
  {
    builder: getInstallations,
    id: Installations,
  },
  {
    builder: getMachineLearning,
    id: MachineLearning,
  },
  {
    builder: getMessaging,
    id: Messaging,
  },
  {
    builder: getProjectManagement,
    id: ProjectManagement,
  },
  {
    builder: getRemoteConfig,
    id: RemoteConfig,
  },
  {
    builder: getSecurityRules,
    id: SecurityRules,
  },
  {
    builder: getStorage,
    id: Storage,
  },
];
