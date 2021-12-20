import { Inject, Injectable } from '@nestjs/common';
// eslint-disable-next-line import/no-unresolved
import { AppOptions, initializeApp } from 'firebase-admin/app';

import { FirebaseInstance, FirebaseType } from '../models/FirebaseType';
import { APP_OPTIONS } from './firebaseAdminCoreInjectionSymbols';
import { idFirebaseBuilderPairs } from './idFirebaseBuilderPairs';

@Injectable()
export class FirebaseInstanceBuilderProvider {
  private readonly firebaseTypeToFirebaseInstanceBuilderMap: Map<FirebaseType, () => FirebaseInstance> = new Map();

  constructor(@Inject(APP_OPTIONS) appOptions: AppOptions) {
    for (const idFirebaseBuilderPair of idFirebaseBuilderPairs) {
      this.firebaseTypeToFirebaseInstanceBuilderMap.set(idFirebaseBuilderPair.id, idFirebaseBuilderPair.builder);
    }

    initializeApp(appOptions);
  }

  public getFirebaseInstanceBuilder(firebaseProviderType: FirebaseType): () => FirebaseInstance {
    return this.firebaseTypeToFirebaseInstanceBuilderMap.get(firebaseProviderType) as () => FirebaseInstance;
  }
}
