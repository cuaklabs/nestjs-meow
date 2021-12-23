import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppClassAsyncOptions } from '../models/NestFirebaseAdminAppClassAsyncOptions';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { NestFirebaseAdminAppOptionsFactory } from '../models/NestFirebaseAdminAppOptionsFactory';
import { isNestFirebaseAdminAppClassAsyncOptions } from './isNestFirebaseAdminAppClassAsyncOptions';

describe(isNestFirebaseAdminAppClassAsyncOptions.name, () => {
  describe('having a NestFirebaseAdminAppAsyncOptions which is not a NestFirebaseAdminAppClassAsyncOptions', () => {
    let nestFirebaseAdminAppAsyncOptions: NestFirebaseAdminAppAsyncOptions;

    beforeAll(() => {
      nestFirebaseAdminAppAsyncOptions = {
        useFactory: () => ({}),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestFirebaseAdminAppClassAsyncOptions(nestFirebaseAdminAppAsyncOptions);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a NestFirebaseAdminAppClassAsyncOptions', () => {
    let appAsyncOptions: NestFirebaseAdminAppClassAsyncOptions;

    beforeAll(() => {
      class AppOptionsFactory implements NestFirebaseAdminAppOptionsFactory {
        public createNestFirebaseAdminAppOptions(): NestFirebaseAdminAppOptions | Promise<NestFirebaseAdminAppOptions> {
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
        result = isNestFirebaseAdminAppClassAsyncOptions(appAsyncOptions);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });
});
