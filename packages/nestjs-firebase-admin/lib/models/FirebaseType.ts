/* eslint-disable import/no-unresolved */
import { AppCheck } from 'firebase-admin/app-check';
import { Auth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';
import { Installations } from 'firebase-admin/installations';
import { MachineLearning } from 'firebase-admin/machine-learning';
import { Messaging } from 'firebase-admin/messaging';
import { ProjectManagement } from 'firebase-admin/project-management';
import { RemoteConfig } from 'firebase-admin/remote-config';
import { SecurityRules } from 'firebase-admin/security-rules';
import { Storage } from 'firebase-admin/storage';

export type FirebaseType =
  | typeof Auth
  | typeof Firestore
  | typeof Messaging
  | typeof AppCheck
  | typeof Installations
  | typeof MachineLearning
  | typeof ProjectManagement
  | typeof RemoteConfig
  | typeof SecurityRules
  | typeof Storage;

export type FirebaseInstance =
  | Auth
  | Firestore
  | Messaging
  | AppCheck
  | Installations
  | MachineLearning
  | ProjectManagement
  | RemoteConfig
  | SecurityRules
  | Storage;
