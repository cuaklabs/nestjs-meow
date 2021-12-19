import { DynamicModule, Module } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';

import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { FirebaseAdminCoreModule } from './FirebaseAdminCoreModule';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';
import { FirebaseType } from './FirebaseType';

@Module({})
export class FirebaseAdminModule {
  public static forRoot(appOptions: AppOptions): DynamicModule {
    return {
      imports: [FirebaseAdminCoreModule.forRoot(appOptions)],
      module: FirebaseAdminModule,
    };
  }

  public static injectProviders(firebaseTypes: FirebaseType[]): DynamicModule {
    return {
      exports: firebaseTypes,
      module: FirebaseAdminModule,
      providers: firebaseTypes.map((firebaseType: FirebaseType) => {
        return {
          inject: [FirebaseAdminCoreModuleProvider],
          provide: firebaseType,
          useFactory: (firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider) =>
            firebaseAdminCoreModuleProvider.getProvider(firebaseType),
        };
      }),
    };
  }

  public static forRootAsync(appAsyncOptions: AppAsyncOptions): DynamicModule {
    return {
      imports: [FirebaseAdminCoreModule.forRootAsync(appAsyncOptions)],
      module: FirebaseAdminModule,
    };
  }
}
