import { AppOptions } from 'firebase-admin/app';

import { NameAppOptionsPair } from './NameAppOptionsPair';

export type NestFirebaseAdminAppOptions = AppOptions | NameAppOptionsPair[];
