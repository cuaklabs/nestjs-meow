import { NestFirebaseAdminAppAsyncOptions } from '../models/NestFirebaseAdminAppAsyncOptions';
import { NestFirebaseAdminAppClassAsyncOptions } from '../models/NestFirebaseAdminAppClassAsyncOptions';

export function isNestFirebaseAdminAppClassAsyncOptions(
  value: NestFirebaseAdminAppAsyncOptions,
): value is NestFirebaseAdminAppClassAsyncOptions {
  return (
    (value as NestFirebaseAdminAppClassAsyncOptions).useClass !== undefined
  );
}
