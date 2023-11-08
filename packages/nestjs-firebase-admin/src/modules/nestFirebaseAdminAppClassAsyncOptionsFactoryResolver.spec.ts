import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { NestFirebaseAdminAppOptionsFixtures } from '../fixtures/NestFirebaseAdminAppOptionsFixtures';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { NestFirebaseAdminAppOptionsFactory } from '../models/NestFirebaseAdminAppOptionsFactory';
import { nestFirebaseAdminAppClassAsyncOptionsFactoryResolver } from './nestFirebaseAdminAppClassAsyncOptionsFactoryResolver';

describe(nestFirebaseAdminAppClassAsyncOptionsFactoryResolver.name, () => {
  describe('when called', () => {
    let nestFirebaseAdminAppFactoryAsyncOptionsFixture: jest.Mocked<NestFirebaseAdminAppOptionsFactory>;
    let nestFirebaseAdminAppOptionsFixture: NestFirebaseAdminAppOptions;
    let result: unknown;

    beforeAll(() => {
      nestFirebaseAdminAppFactoryAsyncOptionsFixture = {
        createNestFirebaseAdminAppOptions: jest.fn(),
      };
      nestFirebaseAdminAppOptionsFixture = NestFirebaseAdminAppOptionsFixtures.any;

      nestFirebaseAdminAppFactoryAsyncOptionsFixture.createNestFirebaseAdminAppOptions.mockReturnValueOnce(
        nestFirebaseAdminAppOptionsFixture as unknown as
          | NestFirebaseAdminAppOptions
          | Promise<NestFirebaseAdminAppOptions>,
      );

      result = nestFirebaseAdminAppClassAsyncOptionsFactoryResolver(nestFirebaseAdminAppFactoryAsyncOptionsFixture);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call nestFirebaseAdminAppFactoryAsyncOptions.createNestFirebaseAdminAppOptions()', () => {
      expect(nestFirebaseAdminAppFactoryAsyncOptionsFixture.createNestFirebaseAdminAppOptions).toHaveBeenCalledTimes(1);
      expect(nestFirebaseAdminAppFactoryAsyncOptionsFixture.createNestFirebaseAdminAppOptions).toHaveBeenCalledWith();
    });

    it('should return a  NestFirebaseAdminAppOptions | Promise<NestFirebaseAdminAppOptions>', () => {
      expect(result).toBe(nestFirebaseAdminAppOptionsFixture);
    });
  });
});
