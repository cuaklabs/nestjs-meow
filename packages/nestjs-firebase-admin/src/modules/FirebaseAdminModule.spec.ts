import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { DynamicModule } from '@nestjs/common';
import { Auth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';

jest.mock('./FirebaseAdminCoreModule');
jest.mock('./getFirebaseProviderId');

import { FirebaseAdminCoreModule } from './FirebaseAdminCoreModule';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';
import { FirebaseAdminModule } from './FirebaseAdminModule';
import { getFirebaseProviderId } from './getFirebaseProviderId';
import { NestFirebaseAdminAppFactoryAsyncOptionsFixtures } from '../fixtures/NestFirebaseAdminAppFactoryAsyncOptionsFixtures';
import { NestFirebaseAdminAppOptionsFixtures } from '../fixtures/NestFirebaseAdminAppOptionsFixtures';
import { FirebaseType } from '../models/FirebaseType';
import { NestFirebaseAdminAppFactoryAsyncOptions } from '../models/NestFirebaseAdminAppFactoryAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';

describe(FirebaseAdminModule.name, () => {
  describe('.forRoot()', () => {
    let nestFirebaseAdminAppOptions: NestFirebaseAdminAppOptions;
    let dynamicModuleFixture: DynamicModule;

    beforeAll(() => {
      nestFirebaseAdminAppOptions = NestFirebaseAdminAppOptionsFixtures.any;
      dynamicModuleFixture = {
        module: FirebaseAdminCoreModule,
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        nestFirebaseAdminAppOptions = NestFirebaseAdminAppOptionsFixtures.any;
        dynamicModuleFixture = {
          module: FirebaseAdminCoreModule,
        };

        (FirebaseAdminCoreModule.forRoot as jest.Mock<typeof FirebaseAdminCoreModule.forRoot>).mockReturnValueOnce(
          dynamicModuleFixture,
        );

        result = FirebaseAdminModule.forRoot(nestFirebaseAdminAppOptions);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return a Dynamic module', () => {
        expect(result).toStrictEqual({
          imports: [dynamicModuleFixture],
          module: FirebaseAdminModule,
        });
      });

      it('should call FirebaseAdminCoreModule.forRoot()', () => {
        expect(FirebaseAdminCoreModule.forRoot).toHaveBeenCalledTimes(1);
        expect(FirebaseAdminCoreModule.forRoot).toHaveBeenCalledWith(nestFirebaseAdminAppOptions);
      });
    });
  });

  describe('.forRootAsync()', () => {
    let nestFirebaseAdminAppOptions: NestFirebaseAdminAppFactoryAsyncOptions;
    let dynamicModuleFixture: DynamicModule;

    beforeAll(() => {
      nestFirebaseAdminAppOptions = NestFirebaseAdminAppFactoryAsyncOptionsFixtures.any;
      dynamicModuleFixture = {
        module: FirebaseAdminCoreModule,
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        (
          FirebaseAdminCoreModule.forRootAsync as jest.Mock<typeof FirebaseAdminCoreModule.forRootAsync>
        ).mockReturnValueOnce(dynamicModuleFixture);

        result = FirebaseAdminModule.forRootAsync(nestFirebaseAdminAppOptions);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return a Dynamic module', () => {
        expect(result).toStrictEqual({
          imports: [dynamicModuleFixture],
          module: FirebaseAdminModule,
        });
      });

      it('should call FirebaseAdminCoreModule.forRootAsync()', () => {
        expect(FirebaseAdminCoreModule.forRootAsync).toHaveBeenCalledTimes(1);
        expect(FirebaseAdminCoreModule.forRootAsync).toHaveBeenCalledWith(nestFirebaseAdminAppOptions);
      });
    });
  });

  describe('.injectProviders()', () => {
    let firebaseTypes: FirebaseType[];
    let appName: string | undefined;

    beforeAll(() => {
      firebaseTypes = [Auth, Firestore];
      appName = 'app-name-example';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        (getFirebaseProviderId as jest.Mock<typeof getFirebaseProviderId>).mockImplementation(
          (firebaseType: FirebaseType, _appName?: string | undefined) => firebaseType,
        );

        result = FirebaseAdminModule.injectProviders(firebaseTypes, appName);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call getFirebaseProviderId', () => {
        expect(getFirebaseProviderId).toHaveBeenCalledTimes(firebaseTypes.length);
        for (const [i, firebaseType] of firebaseTypes.entries()) {
          expect(getFirebaseProviderId).toHaveBeenNthCalledWith(i + 1, firebaseType, appName);
        }
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          exports: firebaseTypes,
          module: FirebaseAdminModule,
          providers: firebaseTypes.map((firebaseType: FirebaseType) => {
            return {
              inject: [FirebaseAdminCoreModuleProvider],
              provide: firebaseType,
              useFactory: expect.any(Function) as unknown as (...args: unknown[]) => unknown,
            };
          }),
        });
      });
    });
  });
});
