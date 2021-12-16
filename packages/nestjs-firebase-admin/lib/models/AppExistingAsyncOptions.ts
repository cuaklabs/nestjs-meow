import { Type } from '@nestjs/common';

import { AppOptionsFactory } from './AppOptionsFactory';

export interface AppExistingAsyncOptions {
  useExisting: Type<AppOptionsFactory>;
}
