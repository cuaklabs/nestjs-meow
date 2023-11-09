import { Abstract, ModuleMetadata, Type } from '@nestjs/common';

import { NestFirebaseAdminAppOptions } from './NestFirebaseAdminAppOptions';

export interface NestFirebaseAdminAppFactoryAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  inject?: (string | symbol | Function | Type<unknown> | Abstract<unknown>)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory: (...args: any[]) => NestFirebaseAdminAppOptions;
}
