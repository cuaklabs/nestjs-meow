import { DynamicModule, Module } from '@nestjs/common';

import { FirebaseType } from '../models/FirebaseType';
import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { FirebaseAdminCoreModule } from './FirebaseAdminCoreModule';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';
import { getFirebaseProviderId } from './getFirebaseProviderId';

@Module({})
export class FirebaseAdminModule {
  public static forRoot(
    nestFirebaseAdminAppOptions: NestFirebaseAdminAppOptions,
  ): DynamicModule {
    return {
      imports: [FirebaseAdminCoreModule.forRoot(nestFirebaseAdminAppOptions)],
      module: FirebaseAdminModule,
    };
  }

  public static injectProviders(
    firebaseTypes: FirebaseType[],
    appName?: string,
  ): DynamicModule {
    const initialDynamicModule: DynamicModule = {
      exports: [],
      module: FirebaseAdminModule,
      providers: [],
    };

    const firebaseTypeFirebaseProviderIdPairs: [
      FirebaseType,
      string | FirebaseType,
    ][] = firebaseTypes.map(
      (firebaseType: FirebaseType): [FirebaseType, string | FirebaseType] => [
        firebaseType,
        getFirebaseProviderId(firebaseType, appName),
      ],
    );

    const firebaseAdminModule: DynamicModule =
      firebaseTypeFirebaseProviderIdPairs.reduce<DynamicModule>(
        (
          dynamicModule: DynamicModule,
          [firebaseType, firebaseProviderId]: [
            FirebaseType,
            string | FirebaseType,
          ],
        ): DynamicModule => {
          dynamicModule.exports?.push(firebaseProviderId);
          dynamicModule.providers?.push({
            inject: [FirebaseAdminCoreModuleProvider],
            provide: firebaseProviderId,
            useFactory: (
              firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider,
            ) =>
              firebaseAdminCoreModuleProvider.getProvider(
                firebaseType,
                appName,
              ),
          });

          return dynamicModule;
        },
        initialDynamicModule,
      );

    return firebaseAdminModule;
  }

  public static forRootAsync(
    nestFirebaseAdminAppAsyncOptions: NestFirebaseAdminAppAsyncOptions,
  ): DynamicModule {
    return {
      imports: [
        FirebaseAdminCoreModule.forRootAsync(nestFirebaseAdminAppAsyncOptions),
      ],
      module: FirebaseAdminModule,
    };
  }
}
