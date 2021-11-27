import { Type } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';

export interface AppAsyncOptions {
  name?: string;
  useFactory?: (...args: unknown[]) => AppOptions | Promise<AppOptions>;
  useClass?: Type<AppOptionsFactory>;
  useExisting?: Type<AppOptionsFactory>;
  inject?: unknown[];
}

interface AppOptionsFactory {
  createAppOptions: () => AppOptions | Promise<AppOptions>;
}
