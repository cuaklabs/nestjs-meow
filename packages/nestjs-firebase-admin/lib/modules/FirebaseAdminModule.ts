/* eslint-disable import/no-unresolved */
import { DynamicModule, Module } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
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

import { AppAsyncOptions } from './AppAsyncOptions';

export type FirebaseProviderType =
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

type FirebaseProviderInstance =
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

@Module({})
export class FirebaseAdminModule {
  private static readonly providers: Map<FirebaseProviderType, FirebaseProviderInstance> = new Map();
  private static readonly initFunctions: Map<FirebaseProviderType, () => FirebaseProviderInstance> = new Map();

  public static forRoot(options: AppOptions, initProviders?: FirebaseProviderType[]): DynamicModule {
    initializeApp(options);

    this.initFunctions.set(Auth, getAuth);
    this.initFunctions.set(Firestore, getFirestore);
    this.initFunctions.set(Messaging, getMessaging);
    this.initFunctions.set(AppCheck, getAppCheck);
    this.initFunctions.set(Installations, getInstallations);
    this.initFunctions.set(MachineLearning, getMachineLearning);
    this.initFunctions.set(ProjectManagement, getProjectManagement);
    this.initFunctions.set(RemoteConfig, getRemoteConfig);
    this.initFunctions.set(SecurityRules, getSecurityRules);
    this.initFunctions.set(Storage, getStorage);

    return initProviders === undefined
      ? {
          module: FirebaseAdminModule,
        }
      : this.getFeature(initProviders);
  }

  public static getFeature(providers: FirebaseProviderType[]): DynamicModule {
    return {
      exports: providers,
      module: FirebaseAdminModule,
      providers: providers.map((element: FirebaseProviderType) => {
        let provider: FirebaseProviderInstance | undefined = this.providers.get(element);

        if (provider === undefined) {
          const providerBuilder: () => FirebaseProviderInstance = this.initFunctions.get(
            element,
          ) as () => FirebaseProviderInstance;
          provider = providerBuilder();
          this.providers.set(element, provider);
        }

        return {
          provide: element,
          useValue: provider,
        };
      }),
    };
  }

  public static forRootAsync(_options: AppAsyncOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
    };
  }
}
