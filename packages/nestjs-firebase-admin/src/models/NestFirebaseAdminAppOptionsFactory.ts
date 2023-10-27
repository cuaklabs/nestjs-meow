import { NestFirebaseAdminAppOptions } from './NestFirebaseAdminAppOptions';

export interface NestFirebaseAdminAppOptionsFactory {
  createNestFirebaseAdminAppOptions: () =>
    | NestFirebaseAdminAppOptions
    | Promise<NestFirebaseAdminAppOptions>;
}
