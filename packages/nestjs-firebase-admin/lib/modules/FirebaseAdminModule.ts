import { DynamicModule, Module, Provider } from '@nestjs/common';
// eslint-disable-next-line import/no-unresolved
import { AppOptions } from 'firebase-admin/app';

import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { AppOptionsFactory } from '../models/AppOptionsFactory';
import { FirebaseInstance } from '../models/FirebaseType';
import { IdFirebaseBuilderPair } from '../models/IdFirebaseBuilderPair';
import { isAppClassAsyncOptions } from '../typeguards/isAppClassAsyncOptions';
import { isAppFactoryAsyncOptions } from '../typeguards/isAppFactoryAsyncOptions';
import { APP_OPTIONS, APP_OPTIONS_FACTORY } from './firebaseAdminCoreInjectionSymbols';
import { FirebaseInstanceBuilderProvider } from './FirebaseInstanceBuilderProvider';
import { idFirebaseBuilderPairs } from './idFirebaseBuilderPairs';

@Module({})
export class FirebaseAdminModule {
  public static forRootAsync(appAsyncOptions: AppAsyncOptions): DynamicModule {
    const moduleProviders: Provider[] = [];

    if (isAppFactoryAsyncOptions(appAsyncOptions)) {
      moduleProviders.push({
        inject: appAsyncOptions.inject ?? [],
        provide: APP_OPTIONS,
        useFactory: appAsyncOptions.useFactory,
      });
    } else {
      if (isAppClassAsyncOptions(appAsyncOptions)) {
        moduleProviders.push({
          provide: APP_OPTIONS_FACTORY,
          useClass: appAsyncOptions.useClass,
        });
      } else {
        moduleProviders.push({
          provide: APP_OPTIONS_FACTORY,
          useValue: appAsyncOptions.useExisting,
        });
      }
      moduleProviders.push({
        inject: [APP_OPTIONS_FACTORY],
        provide: APP_OPTIONS,
        useFactory: (appOptionsFactory: AppOptionsFactory) => appOptionsFactory.createAppOptions(),
      });
    }

    return this.buildModule(moduleProviders);
  }

  public static forRoot(appOptions: AppOptions): DynamicModule {
    const moduleProviders: Provider[] = [
      {
        provide: APP_OPTIONS,
        useValue: appOptions,
      },
    ];
    return this.buildModule(moduleProviders);
  }

  private static buildModule(moduleProviders: Provider[]): DynamicModule {
    return {
      exports: idFirebaseBuilderPairs.map((idFirebaseBuilderPair: IdFirebaseBuilderPair) => idFirebaseBuilderPair.id),
      module: FirebaseAdminModule,
      providers: [
        ...moduleProviders,
        FirebaseInstanceBuilderProvider,
        ...idFirebaseBuilderPairs.map((idFirebaseBuilderPair: IdFirebaseBuilderPair) => {
          return {
            inject: [FirebaseInstanceBuilderProvider],
            provide: idFirebaseBuilderPair.id,
            useFactory: (firebaseInstanceBuilderProvider: FirebaseInstanceBuilderProvider): FirebaseInstance =>
              firebaseInstanceBuilderProvider.getFirebaseInstanceBuilder(idFirebaseBuilderPair.id)(),
          };
        }),
      ],
    };
  }
}
