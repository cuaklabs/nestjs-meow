import { jest } from '@jest/globals';

import { NestFirebaseAdminAppFactoryAsyncOptions } from '../models/NestFirebaseAdminAppFactoryAsyncOptions';

export class NestFirebaseAdminAppFactoryAsyncOptionsFixtures {
  public static get any(): jest.Mocked<NestFirebaseAdminAppFactoryAsyncOptions> {
    const fixture: jest.Mocked<NestFirebaseAdminAppFactoryAsyncOptions> = {
      imports: [],
      inject: [],
      useFactory: jest.fn(),
    };

    return fixture;
  }

  public static get withoutImports(): jest.Mocked<NestFirebaseAdminAppFactoryAsyncOptions> {
    const fixture: jest.Mocked<NestFirebaseAdminAppFactoryAsyncOptions> = {
      inject: [],
      useFactory: jest.fn(),
    };

    return fixture;
  }

  public static get withoutInject(): jest.Mocked<NestFirebaseAdminAppFactoryAsyncOptions> {
    const fixture: jest.Mocked<NestFirebaseAdminAppFactoryAsyncOptions> = {
      imports: [],
      useFactory: jest.fn(),
    };

    return fixture;
  }
}
