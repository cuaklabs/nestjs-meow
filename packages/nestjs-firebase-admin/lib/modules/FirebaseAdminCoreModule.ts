import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';

import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { AppOptionsFactory } from '../models/AppOptionsFactory';
import { isAppClassAsyncOptions } from '../typeguards/isAppClassAsyncOptions';
import { isAppFactoryAsyncOptions } from '../typeguards/isAppFactoryAsyncOptions';
import { APP_OPTIONS, APP_OPTIONS_FACTORY } from './firebaseAdminCoreInjectionSymbols';
import { FirebaseAdminCoreModuleProviders } from './FirebaseAdminCoreModuleProviders';

@Module({})
export class FirebaseAdminCoreModule {
  public static forRootAsync(appAsyncOptions: AppAsyncOptions): DynamicModule {
    const moduleProviders: Provider[] = [FirebaseAdminCoreModuleProviders];

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

    return {
      exports: [FirebaseAdminCoreModuleProviders],
      imports: appAsyncOptions.imports ?? [],
      module: FirebaseAdminCoreModule,
      providers: moduleProviders,
    };
  }

  public static forRoot(appOptions: AppOptions): DynamicModule {
    return {
      exports: [FirebaseAdminCoreModuleProviders],
      module: FirebaseAdminCoreModule,
      providers: [
        {
          provide: APP_OPTIONS,
          useValue: appOptions,
        },
        FirebaseAdminCoreModuleProviders,
      ],
    };
  }
}
