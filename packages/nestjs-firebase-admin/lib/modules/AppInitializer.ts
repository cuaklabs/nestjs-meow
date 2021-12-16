/* eslint-disable import/no-unresolved */
import { Inject, Injectable } from '@nestjs/common';
import { AppOptions } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

import { APP_OPTIONS } from './firebaseAdminCoreInjectionSymbols';

@Injectable()
export class AppInitializer {
  private initialized: boolean = false;

  constructor(@Inject(APP_OPTIONS) private readonly appOptions: AppOptions) {}

  public initialize(): void {
    if (!this.initialized) {
      initializeApp(this.appOptions);
      this.initialized = true;
    }
  }
}
