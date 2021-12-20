import { NestFirebaseAdminAppClassAsyncOptions } from './NestFirebaseAdminAppClassAsyncOptions';
import { NestFirebaseAdminAppFactoryAsyncOptions } from './NestFirebaseAdminAppFactoryAsyncOptions';

export type NestFirebaseAdminAppAsyncOptions =
  | NestFirebaseAdminAppFactoryAsyncOptions
  | NestFirebaseAdminAppClassAsyncOptions;
