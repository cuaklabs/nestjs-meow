import { ModuleMetadata, Type } from '@nestjs/common';

import { NestFirebaseAdminAppOptionsFactory } from './NestFirebaseAdminAppOptionsFactory';

export interface NestFirebaseAdminAppClassAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass: Type<NestFirebaseAdminAppOptionsFactory>;
}
