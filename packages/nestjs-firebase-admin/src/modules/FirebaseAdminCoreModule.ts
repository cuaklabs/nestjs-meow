import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { createNestFirebaseAdminAppOptionsFactory } from './createNestFirebaseAdminAppOptionsFactory';
import { APP_OPTIONS, APP_OPTIONS_FACTORY } from './firebaseAdminCoreInjectionSymbols';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';
import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { isNestFirebaseAdminAppFactoryAsyncOptions } from '../typeguards/isNestFirebaseAdminAppFactoryAsyncOptions';

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
        useFactory: createNestFirebaseAdminAppOptionsFactory,
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
