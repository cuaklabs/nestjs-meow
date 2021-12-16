import { Abstract, Type } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';

export interface AppFactoryAsyncOptions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  inject?: (string | symbol | Function | Type<unknown> | Abstract<unknown>)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory: (...args: any[]) => AppOptions | Promise<AppOptions>;
}
