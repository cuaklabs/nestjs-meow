/* eslint-disable import/no-unresolved */
import { Inject, Injectable } from '@nestjs/common';
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

import { APP_OPTIONS } from './firebaseAdminCoreInjectionSymbols';
import { FirebaseInstance, FirebaseType } from './FirebaseType';

@Injectable()
export class FirebaseAdminCoreModuleProvider {
  private readonly providers: Map<FirebaseType, FirebaseInstance> = new Map();
  private readonly builders: Map<FirebaseType, () => FirebaseInstance> = new Map();

  constructor(@Inject(APP_OPTIONS) appOptions: AppOptions) {
    this.builders.set(Auth, getAuth);
    this.builders.set(AppCheck, getAppCheck);
    this.builders.set(Firestore, getFirestore);
    this.builders.set(Installations, getInstallations);
    this.builders.set(MachineLearning, getMachineLearning);
    this.builders.set(Messaging, getMessaging);
    this.builders.set(ProjectManagement, getProjectManagement);
    this.builders.set(RemoteConfig, getRemoteConfig);
    this.builders.set(SecurityRules, getSecurityRules);
    this.builders.set(Storage, getStorage);

    initializeApp(appOptions);
  }

  public getProvider(firebaseProviderType: FirebaseType): FirebaseInstance {
    let provider: FirebaseInstance | undefined = this.providers.get(firebaseProviderType);

    if (provider === undefined) {
      provider = (this.builders.get(firebaseProviderType) as () => FirebaseInstance)();
      this.providers.set(firebaseProviderType, provider);
    }

    return provider;
  }
}
