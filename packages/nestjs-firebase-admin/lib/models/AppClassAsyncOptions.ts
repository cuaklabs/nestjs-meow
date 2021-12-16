import { Type } from '@nestjs/common';

import { AppOptionsFactory } from './AppOptionsFactory';

export interface AppClassAsyncOptions {
  useClass: Type<AppOptionsFactory>;
}
