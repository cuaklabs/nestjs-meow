import { AppAsyncOptions } from '../models/AppAsyncOptions';
import { AppClassAsyncOptions } from '../models/AppClassAsyncOptions';

export function isAppClassAsyncOptions(value: AppAsyncOptions): value is AppClassAsyncOptions {
  return (value as AppClassAsyncOptions).useClass !== undefined;
}
