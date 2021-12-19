import { AppOptions } from 'firebase-admin';

import { AppAsyncOptions, AppClassAsyncOptions } from '..';
import { isAppClassAsyncOptions } from './isAppClassAsyncOptions';

describe(isAppClassAsyncOptions.name, () => {
  describe('having an AppAsyncOptions which is not an AppClassAsyncOptions', () => {
    let appAsyncOptions: AppAsyncOptions;

    beforeAll(() => {
      appAsyncOptions = {
        useFactory: () => ({}),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isAppClassAsyncOptions(appAsyncOptions);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having an AppClassAsyncOptions', () => {
    let appAsyncOptions: AppClassAsyncOptions;

    beforeAll(() => {
      class Foo {
        public createAppOptions(): AppOptions | Promise<AppOptions> {
          return {};
        }
      }

      appAsyncOptions = {
        useClass: Foo,
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isAppClassAsyncOptions(appAsyncOptions);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });
});
