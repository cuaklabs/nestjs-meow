import { Inject, Injectable } from '@nestjs/common';
import { App, initializeApp } from 'firebase-admin/app';
import { AppCheck, getAppCheck } from 'firebase-admin/app-check';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { getInstallations, Installations } from 'firebase-admin/installations';
import {
  getMachineLearning,
  MachineLearning,
} from 'firebase-admin/machine-learning';
import { getMessaging, Messaging } from 'firebase-admin/messaging';
import {
  getProjectManagement,
  ProjectManagement,
} from 'firebase-admin/project-management';
import { getRemoteConfig, RemoteConfig } from 'firebase-admin/remote-config';
import { getSecurityRules, SecurityRules } from 'firebase-admin/security-rules';
import { getStorage, Storage } from 'firebase-admin/storage';

import { FirebaseInstance, FirebaseType } from '../models/FirebaseType';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { APP_OPTIONS } from './firebaseAdminCoreInjectionSymbols';

const DEFAULT_APP: string = 'default';
@Injectable()
export class FirebaseAdminCoreModuleProvider {
  private readonly providers: Map<string, Map<FirebaseType, FirebaseInstance>> =
    new Map();
  private readonly builders: Map<
    FirebaseType,
    (app?: App) => FirebaseInstance
  > = new Map();
  private readonly firebaseApps: Map<string, App> = new Map();

  constructor(
    @Inject(APP_OPTIONS)
    nestFirebaseAdminAppOptions: NestFirebaseAdminAppOptions,
  ) {
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

    if (Array.isArray(nestFirebaseAdminAppOptions)) {
      for (const nameAppOptionsPair of nestFirebaseAdminAppOptions) {
        this.firebaseApps.set(
          nameAppOptionsPair.name,
          initializeApp(nameAppOptionsPair.appOptions, nameAppOptionsPair.name),
        );
        this.providers.set(nameAppOptionsPair.name, new Map());
      }
    } else {
      this.firebaseApps.set(
        DEFAULT_APP,
        initializeApp(nestFirebaseAdminAppOptions),
      );
      this.providers.set(DEFAULT_APP, new Map());
    }
  }

  public getProvider(
    firebaseType: FirebaseType,
    appName?: string,
  ): FirebaseInstance {
    const providersByAppName: Map<FirebaseType, FirebaseInstance> | undefined =
      this.providers.get(appName ?? DEFAULT_APP);

    if (providersByAppName === undefined) {
      let errorDescription: string;

      if (appName === undefined) {
        errorDescription =
          'App does not exist. Expecting a named app, found no app name.';
      } else {
        errorDescription = `No app with name "${appName}" was found.`;
      }

      throw new Error(errorDescription);
    } else {
      let provider: FirebaseInstance | undefined =
        providersByAppName.get(firebaseType);

      if (provider === undefined) {
        const builder: (app?: App) => FirebaseInstance = this.builders.get(
          firebaseType,
        ) as (app?: App) => FirebaseInstance;

        provider = builder(this.firebaseApps.get(appName ?? DEFAULT_APP));
        providersByAppName.set(firebaseType, provider);
      }

      return provider;
    }
  }
}
