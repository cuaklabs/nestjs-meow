import { DynamicModule, Module } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';

import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { FirebaseAdminCoreModule } from './FirebaseAdminCoreModule';
import { FirebaseProviderType } from './FirebaseProviderType';

@Module({})
export class FirebaseAdminModule {
  public static forRoot(appOptions: AppOptions): DynamicModule {
    return {
      imports: [FirebaseAdminCoreModule.forRoot(appOptions)],
      module: FirebaseAdminModule,
    };
  }

  public static getFeature(providers: FirebaseProviderType[]): DynamicModule {
    return {
      exports: providers,
      imports: [FirebaseAdminCoreModule],
      module: FirebaseAdminModule,
    };
  }

  public static forRootAsync(appAsyncOptions: AppAsyncOptions): DynamicModule {
    return {
      imports: [FirebaseAdminCoreModule.forRootAsync(appAsyncOptions)],
      module: FirebaseAdminModule,
    };
  }
}
