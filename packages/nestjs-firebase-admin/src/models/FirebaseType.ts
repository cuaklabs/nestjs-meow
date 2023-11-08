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
  | typeof AppCheck
  | typeof Auth
  | typeof Firestore
  | typeof Installations
  | typeof MachineLearning
  | typeof Messaging
  | typeof ProjectManagement
  | typeof RemoteConfig
  | typeof SecurityRules
  | typeof Storage;

export type FirebaseInstance =
  | AppCheck
  | Auth
  | Firestore
  | Installations
  | MachineLearning
  | Messaging
  | ProjectManagement
  | RemoteConfig
  | SecurityRules
  | Storage;
