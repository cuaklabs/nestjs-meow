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
}
