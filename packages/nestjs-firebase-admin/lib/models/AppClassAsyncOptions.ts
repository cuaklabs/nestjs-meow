import { ModuleMetadata, Type } from '@nestjs/common';

import { AppOptionsFactory } from './AppOptionsFactory';

export interface AppClassAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass: Type<AppOptionsFactory>;
}
