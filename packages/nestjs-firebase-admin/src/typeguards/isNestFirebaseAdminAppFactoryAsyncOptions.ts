import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppFactoryAsyncOptions } from '../models/NestFirebaseAdminAppFactoryAsyncOptions';

export function isNestFirebaseAdminAppFactoryAsyncOptions(
  value: NestFirebaseAdminAppAsyncOptions,
): value is NestFirebaseAdminAppFactoryAsyncOptions {
  return (value as NestFirebaseAdminAppFactoryAsyncOptions).useFactory !== undefined;
}
