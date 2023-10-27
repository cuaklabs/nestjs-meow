import { beforeAll, describe, expect, it } from '@jest/globals';

import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppClassAsyncOptions } from '../models/NestFirebaseAdminAppClassAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { NestFirebaseAdminAppOptionsFactory } from '../models/NestFirebaseAdminAppOptionsFactory';
import { isNestFirebaseAdminAppFactoryAsyncOptions } from './isNestFirebaseAdminAppFactoryAsyncOptions';

describe(isNestFirebaseAdminAppFactoryAsyncOptions.name, () => {
  describe('having a isNestFirebaseAdminAppFactoryAsyncOptions which is not a isNestFirebaseAdminAppFactoryAsyncOptions', () => {
    let appAsyncOptions: NestFirebaseAdminAppClassAsyncOptions;

    beforeAll(() => {
      class AppOptionsFactory implements NestFirebaseAdminAppOptionsFactory {
        public createNestFirebaseAdminAppOptions():
          | NestFirebaseAdminAppOptions
          | Promise<NestFirebaseAdminAppOptions> {
          return {};
        }
      }

      appAsyncOptions = {
        useClass: AppOptionsFactory,
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestFirebaseAdminAppFactoryAsyncOptions(appAsyncOptions);
      });

      it('should return true', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a isNestFirebaseAdminAppFactoryAsyncOptions', () => {
    let nestFirebaseAdminAppAsyncOptions: NestFirebaseAdminAppAsyncOptions;

    beforeAll(() => {
      nestFirebaseAdminAppAsyncOptions = {
        useFactory: () => ({}),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestFirebaseAdminAppFactoryAsyncOptions(
          nestFirebaseAdminAppAsyncOptions,
        );
      });

      it('should return false', () => {
        expect(result).toBe(true);
      });
    });
  });
});
