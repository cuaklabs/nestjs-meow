import { AppOptions } from 'firebase-admin';

export interface AppAsyncOptions {
  name?: string;
  userFactory?: (...args: unknown[]) => Promise<AppOptions> | AppOptions;
}
