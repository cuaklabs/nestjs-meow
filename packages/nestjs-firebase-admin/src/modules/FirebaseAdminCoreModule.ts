import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { isNestFirebaseAdminAppFactoryAsyncOptions } from '../typeguards/isNestFirebaseAdminAppFactoryAsyncOptions';
import { APP_OPTIONS, APP_OPTIONS_FACTORY } from './firebaseAdminCoreInjectionSymbols';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';
import { nestFirebaseAdminAppClassAsyncOptionsFactoryResolver } from './nestFirebaseAdminAppClassAsyncOptionsFactoryResolver';

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  public static forRootAsync(nestFirebaseAdminAppAsyncOptions: NestFirebaseAdminAppAsyncOptions): DynamicModule {
    const moduleProviders: Provider[] = [FirebaseAdminCoreModuleProvider];

    if (isNestFirebaseAdminAppFactoryAsyncOptions(nestFirebaseAdminAppAsyncOptions)) {
      moduleProviders.push({
        inject: nestFirebaseAdminAppAsyncOptions.inject ?? [],
        provide: APP_OPTIONS,
        useFactory: nestFirebaseAdminAppAsyncOptions.useFactory,
      });
    } else {
      moduleProviders.push({
        provide: APP_OPTIONS_FACTORY,
        useClass: nestFirebaseAdminAppAsyncOptions.useClass,
      });

      moduleProviders.push({
        inject: [APP_OPTIONS_FACTORY],
        provide: APP_OPTIONS,
        useFactory: nestFirebaseAdminAppClassAsyncOptionsFactoryResolver,
      });
    }

    return {
      exports: [FirebaseAdminCoreModuleProvider],
      imports: nestFirebaseAdminAppAsyncOptions.imports ?? [],
      module: FirebaseAdminCoreModule,
      providers: moduleProviders,
    };
  }

  public static forRoot(nestFirebaseAdminAppOptions: NestFirebaseAdminAppOptions): DynamicModule {
    return {
      exports: [FirebaseAdminCoreModuleProvider],
      module: FirebaseAdminCoreModule,
      providers: [
        {
          provide: APP_OPTIONS,
          useValue: nestFirebaseAdminAppOptions,
        },
        FirebaseAdminCoreModuleProvider,
      ],
    };
  }
}
