import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { NestFirebaseAdminAppOptionsFactory } from '../models/NestFirebaseAdminAppOptionsFactory';

export function nestFirebaseAdminAppClassAsyncOptionsFactoryResolver(
  nestFirebaseAdminAppFactoryAsyncOptions: NestFirebaseAdminAppOptionsFactory,
): Promise<NestFirebaseAdminAppOptions> | NestFirebaseAdminAppOptions {
  return nestFirebaseAdminAppFactoryAsyncOptions.createNestFirebaseAdminAppOptions();
}
