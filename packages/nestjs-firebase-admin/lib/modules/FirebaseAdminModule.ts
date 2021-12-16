import { DynamicModule, Module } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';

import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { FirebaseAdminCoreModule } from './FirebaseAdminCoreModule';
import { FirebaseAdminCoreModuleProviders } from './FirebaseAdminCoreModuleProviders';
import { FirebaseProviderType } from './FirebaseProviderType';

@Module({})
export class FirebaseAdminModule {
  public static forRoot(appOptions: AppOptions): DynamicModule {
    return {
      imports: [FirebaseAdminCoreModule.forRoot(appOptions)],
      module: FirebaseAdminModule,
    };
  }

  public static injectProviders(firebaseProviders: FirebaseProviderType[]): DynamicModule {
    return {
      exports: firebaseProviders,
      imports: [FirebaseAdminCoreModule],
      module: FirebaseAdminModule,
      providers: firebaseProviders.map((element: FirebaseProviderType) => {
        return {
          inject: [FirebaseAdminCoreModuleProviders],
          provide: element,
          useFactory: (firebaseAdminCoreModuleProviders: FirebaseAdminCoreModuleProviders) =>
            firebaseAdminCoreModuleProviders.getProvider(element),
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
