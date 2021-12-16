import { ModuleMetadata, Type } from '@nestjs/common';

import { AppOptionsFactory } from './AppOptionsFactory';

export interface AppExistingAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting: Type<AppOptionsFactory>;
}
