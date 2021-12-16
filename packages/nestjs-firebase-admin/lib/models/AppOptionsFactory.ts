import { AppOptions } from 'firebase-admin';

export interface AppOptionsFactory {
  createAppOptions: () => AppOptions | Promise<AppOptions>;
}
