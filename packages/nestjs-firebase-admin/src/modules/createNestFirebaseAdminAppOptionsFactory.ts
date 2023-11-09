import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { NestFirebaseAdminAppOptionsFactory } from '../models/NestFirebaseAdminAppOptionsFactory';

export function createNestFirebaseAdminAppOptionsFactory(
  nestFirebaseAdminAppFactoryAsyncOptions: NestFirebaseAdminAppOptionsFactory,
): Promise<NestFirebaseAdminAppOptions> | NestFirebaseAdminAppOptions {
  return nestFirebaseAdminAppFactoryAsyncOptions.createNestFirebaseAdminAppOptions();
}
