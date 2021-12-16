import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { AppFactoryAsyncOptions } from '../models/AppFactoryAsyncOptions';

export function isAppFactoryAsyncOptions(value: AppAsyncOptions): value is AppFactoryAsyncOptions {
  return (value as AppFactoryAsyncOptions).useFactory !== undefined;
}
