import { AppClassAsyncOptions } from './AppClassAsyncOptions';
import { AppExistingAsyncOptions } from './AppExistingAsyncOptions';
import { AppFactoryAsyncOptions } from './AppFactoryAsyncOptions';

export type AppAsyncOptions = AppFactoryAsyncOptions | AppClassAsyncOptions | AppExistingAsyncOptions;
