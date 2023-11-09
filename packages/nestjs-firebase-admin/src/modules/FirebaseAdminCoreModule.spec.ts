import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('../typeguards/isNestFirebaseAdminAppFactoryAsyncOptions');

import { NestFirebaseAdminAppFactoryAsyncOptionsFixtures } from '../fixtures/NestFirebaseAdminAppFactoryAsyncOptionsFixtures';
import { NestFirebaseAdminAppOptionsFixtures } from '../fixtures/NestFirebaseAdminAppOptionsFixtures';
import { NestFirebaseAdminAppClassAsyncOptions } from '../models/NestFirebaseAdminAppClassAsyncOptions';
import { NestFirebaseAdminAppFactoryAsyncOptions } from '../models/NestFirebaseAdminAppFactoryAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { NestFirebaseAdminAppOptionsFactory } from '../models/NestFirebaseAdminAppOptionsFactory';
import { isNestFirebaseAdminAppFactoryAsyncOptions } from '../typeguards/isNestFirebaseAdminAppFactoryAsyncOptions';
import { createNestFirebaseAdminAppOptionsFactory } from './createNestFirebaseAdminAppOptionsFactory';
import { APP_OPTIONS, APP_OPTIONS_FACTORY } from './firebaseAdminCoreInjectionSymbols';
import { FirebaseAdminCoreModule } from './FirebaseAdminCoreModule';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';

describe(FirebaseAdminCoreModule.name, () => {
  describe('.forRoot()', () => {
    describe('when called', () => {
      let nestFirebaseAdminAppOptions: NestFirebaseAdminAppOptions;
      let result: unknown;

      beforeAll(() => {
        nestFirebaseAdminAppOptions = NestFirebaseAdminAppOptionsFixtures.any;

        result = FirebaseAdminCoreModule.forRoot(nestFirebaseAdminAppOptions);
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          exports: [FirebaseAdminCoreModuleProvider],
          module: FirebaseAdminCoreModule,
          providers: [
            {
              provide: APP_OPTIONS,
              useValue: nestFirebaseAdminAppOptions,
            },
            FirebaseAdminCoreModuleProvider,
          ],
        });
      });
    });
  });

  describe('.forRootAsync()', () => {
    describe('having a NestFirebaseAdminAppFactoryAsyncOptions', () => {
      let nestFirebaseAdminAppOptions: NestFirebaseAdminAppFactoryAsyncOptions;

      beforeAll(() => {
        nestFirebaseAdminAppOptions = NestFirebaseAdminAppFactoryAsyncOptionsFixtures.any;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          (
            isNestFirebaseAdminAppFactoryAsyncOptions as unknown as jest.Mock<
              typeof isNestFirebaseAdminAppFactoryAsyncOptions
            >
          ).mockReturnValueOnce(true);

          result = FirebaseAdminCoreModule.forRootAsync(nestFirebaseAdminAppOptions);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [FirebaseAdminCoreModuleProvider],
            imports: nestFirebaseAdminAppOptions.imports,
            module: FirebaseAdminCoreModule,
            providers: [
              FirebaseAdminCoreModuleProvider,
              {
                inject: nestFirebaseAdminAppOptions.inject,
                provide: APP_OPTIONS,
                useFactory: nestFirebaseAdminAppOptions.useFactory,
              },
            ],
          });
        });

        it('should call isNestFirebaseAdminAppFactoryAsyncOptions()', () => {
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledWith(nestFirebaseAdminAppOptions);
        });
      });
    });

    describe('having a NestFirebaseAdminAppFactoryAsyncOptions without inject', () => {
      let nestFirebaseAdminAppOptions: NestFirebaseAdminAppFactoryAsyncOptions;

      beforeAll(() => {
        nestFirebaseAdminAppOptions = NestFirebaseAdminAppFactoryAsyncOptionsFixtures.withoutInject;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          (
            isNestFirebaseAdminAppFactoryAsyncOptions as unknown as jest.Mock<
              typeof isNestFirebaseAdminAppFactoryAsyncOptions
            >
          ).mockReturnValueOnce(true);

          result = FirebaseAdminCoreModule.forRootAsync(nestFirebaseAdminAppOptions);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [FirebaseAdminCoreModuleProvider],
            imports: nestFirebaseAdminAppOptions.imports,
            module: FirebaseAdminCoreModule,
            providers: [
              FirebaseAdminCoreModuleProvider,
              {
                inject: [],
                provide: APP_OPTIONS,
                useFactory: nestFirebaseAdminAppOptions.useFactory,
              },
            ],
          });
        });

        it('should call isNestFirebaseAdminAppFactoryAsyncOptions()', () => {
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledWith(nestFirebaseAdminAppOptions);
        });
      });
    });

    describe('having a NestFirebaseAdminAppFactoryAsyncOptions without imports', () => {
      let nestFirebaseAdminAppOptions: NestFirebaseAdminAppFactoryAsyncOptions;

      beforeAll(() => {
        nestFirebaseAdminAppOptions = NestFirebaseAdminAppFactoryAsyncOptionsFixtures.withoutImports;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          (
            isNestFirebaseAdminAppFactoryAsyncOptions as unknown as jest.Mock<
              typeof isNestFirebaseAdminAppFactoryAsyncOptions
            >
          ).mockReturnValueOnce(true);

          result = FirebaseAdminCoreModule.forRootAsync(nestFirebaseAdminAppOptions);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [FirebaseAdminCoreModuleProvider],
            imports: [],
            module: FirebaseAdminCoreModule,
            providers: [
              FirebaseAdminCoreModuleProvider,
              {
                inject: nestFirebaseAdminAppOptions.inject,
                provide: APP_OPTIONS,
                useFactory: nestFirebaseAdminAppOptions.useFactory,
              },
            ],
          });
        });

        it('should call isNestFirebaseAdminAppFactoryAsyncOptions()', () => {
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledWith(nestFirebaseAdminAppOptions);
        });
      });
    });

    describe('having a NestFirebaseAdminAppClassAsyncOptions', () => {
      let nestFirebaseAdminAppOptions: NestFirebaseAdminAppClassAsyncOptions;

      beforeAll(() => {
        class ClassProviderFixture implements NestFirebaseAdminAppOptionsFactory {
          public createNestFirebaseAdminAppOptions():
            | NestFirebaseAdminAppOptions
            | Promise<NestFirebaseAdminAppOptions> {
            return {
              databaseURL: 'database-url-example',
            };
          }
        }

        nestFirebaseAdminAppOptions = {
          imports: [],
          useClass: ClassProviderFixture,
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          (
            isNestFirebaseAdminAppFactoryAsyncOptions as unknown as jest.Mock<
              typeof isNestFirebaseAdminAppFactoryAsyncOptions
            >
          ).mockReturnValueOnce(false);

          result = FirebaseAdminCoreModule.forRootAsync(nestFirebaseAdminAppOptions);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [FirebaseAdminCoreModuleProvider],
            imports: nestFirebaseAdminAppOptions.imports,
            module: FirebaseAdminCoreModule,
            providers: [
              FirebaseAdminCoreModuleProvider,
              {
                provide: APP_OPTIONS_FACTORY,
                useClass: nestFirebaseAdminAppOptions.useClass,
              },
              {
                inject: [APP_OPTIONS_FACTORY],
                provide: APP_OPTIONS,
                useFactory: createNestFirebaseAdminAppOptionsFactory,
              },
            ],
          });
        });

        it('should call isNestFirebaseAdminAppFactoryAsyncOptions()', () => {
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestFirebaseAdminAppFactoryAsyncOptions).toHaveBeenCalledWith(nestFirebaseAdminAppOptions);
        });
      });
    });
  });
});
