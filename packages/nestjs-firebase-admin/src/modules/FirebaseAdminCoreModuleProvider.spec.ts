import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('firebase-admin/app');
jest.mock('firebase-admin/app-check');
jest.mock('firebase-admin/auth');
jest.mock('firebase-admin/firestore');
jest.mock('firebase-admin/installations');
jest.mock('firebase-admin/machine-learning');
jest.mock('firebase-admin/messaging');
jest.mock('firebase-admin/project-management');
jest.mock('firebase-admin/remote-config');
jest.mock('firebase-admin/security-rules');
jest.mock('firebase-admin/storage');

import { App, AppOptions, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

import { FirebaseType } from '../models/FirebaseType';
import { NameAppOptionsPair } from '../models/NameAppOptionsPair';
import { NestFirebaseAdminAppOptions } from '../models/NestFirebaseAdminAppOptions';
import { FirebaseAdminCoreModuleProvider } from './FirebaseAdminCoreModuleProvider';

describe(FirebaseAdminCoreModuleProvider.name, () => {
  describe('.constructor()', () => {
    describe('having an AppOptions', () => {
      let appOptionsFixture: AppOptions;

      beforeAll(() => {
        appOptionsFixture = {};
      });

      describe('when called', () => {
        beforeAll(() => {
          (initializeApp as jest.Mock<typeof initializeApp>).mockReturnValueOnce({} as Partial<App> as App);

          new FirebaseAdminCoreModuleProvider(appOptionsFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call initializeApp()', () => {
          expect(initializeApp).toHaveBeenCalledTimes(1);
          expect(initializeApp).toHaveBeenCalledWith(appOptionsFixture);
        });
      });
    });

    describe('having a NameAppOptionsPair[]', () => {
      let nameAppOptionsPairFixture: NameAppOptionsPair[];

      beforeAll(() => {
        nameAppOptionsPairFixture = [
          {
            appOptions: {},
            name: 'name-example',
          },
        ];
      });

      describe('when called', () => {
        beforeAll(() => {
          (initializeApp as jest.Mock<typeof initializeApp>).mockReturnValueOnce({} as Partial<App> as App);

          new FirebaseAdminCoreModuleProvider(nameAppOptionsPairFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call initializeApp()', () => {
          expect(initializeApp).toHaveBeenCalledTimes(nameAppOptionsPairFixture.length);

          for (const [i, nameAppOptionsPair] of nameAppOptionsPairFixture.entries()) {
            expect(initializeApp).toHaveBeenNthCalledWith(
              i + 1,
              nameAppOptionsPair.appOptions,
              nameAppOptionsPair.name,
            );
          }
        });
      });
    });
  });

  describe('.getProvider()', () => {
    describe('when called, and providers.get() returns a Map<FirebaseType, FirebaseInstance>', () => {
      let firebaseTypeFixture: FirebaseType;
      let appName: string | undefined;
      let authFixture: Auth;
      let appFixture: App;

      let result: unknown;

      beforeAll(() => {
        firebaseTypeFixture = Auth;
        appName = undefined;
        authFixture = {} as Partial<Auth> as Auth;
        appFixture = {} as Partial<App> as App;

        (initializeApp as jest.Mock<typeof initializeApp>).mockReturnValueOnce(appFixture);
        (getAuth as jest.Mock<typeof getAuth>).mockReturnValueOnce(authFixture);

        const appOptionsFixture: AppOptions = {};

        const firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider = new FirebaseAdminCoreModuleProvider(
          appOptionsFixture,
        );

        result = firebaseAdminCoreModuleProvider.getProvider(firebaseTypeFixture, appName);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call builder', () => {
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(getAuth).toHaveBeenCalledWith(appFixture);
      });

      it('should return a Provider', () => {
        expect(result).toBe(authFixture);
      });
    });

    describe('having an appName undefined', () => {
      let appName: undefined;

      beforeAll(() => {
        appName = undefined;
      });

      describe('when called and providers.get() returns undefined', () => {
        let firebaseTypeFixture: FirebaseType;
        let appFixture: App;

        let result: unknown;

        beforeAll(() => {
          firebaseTypeFixture = Auth;
          appFixture = {} as Partial<App> as App;

          (initializeApp as jest.Mock<typeof initializeApp>).mockReturnValueOnce(appFixture);

          const appOptionsFixture: NestFirebaseAdminAppOptions = [{ appOptions: {}, name: 'other-app-name-example' }];

          const firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider = new FirebaseAdminCoreModuleProvider(
            appOptionsFixture,
          );

          try {
            firebaseAdminCoreModuleProvider.getProvider(firebaseTypeFixture, appName);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should throw a Error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toBe('App does not exist. Expecting a named app, found no app name.');
        });
      });
    });

    describe('having an appName string', () => {
      let appName: string;

      beforeAll(() => {
        appName = 'app-name-example';
      });

      describe('when called and this.providers.get() returns undefined', () => {
        let firebaseTypeFixture: FirebaseType;
        let appFixture: App;

        let result: unknown;

        beforeAll(() => {
          firebaseTypeFixture = Auth;
          appFixture = {} as Partial<App> as App;

          (initializeApp as jest.Mock<typeof initializeApp>).mockReturnValueOnce(appFixture);

          const appOptionsFixture: NestFirebaseAdminAppOptions = [{ appOptions: {}, name: 'other-app-name-example' }];

          const firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider = new FirebaseAdminCoreModuleProvider(
            appOptionsFixture,
          );

          try {
            firebaseAdminCoreModuleProvider.getProvider(firebaseTypeFixture, appName);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should throw a Error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toBe(`No app with name "${appName}" was found.`);
        });
      });
    });
  });
});
