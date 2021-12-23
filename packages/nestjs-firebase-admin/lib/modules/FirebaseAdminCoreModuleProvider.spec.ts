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

// eslint-disable-next-line import/no-unresolved
import { App, AppOptions, initializeApp } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
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
          (initializeApp as jest.Mock<App>).mockReturnValueOnce({} as Partial<App> as App);

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
          (initializeApp as jest.Mock<App>).mockReturnValueOnce({} as Partial<App> as App);

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
    describe('having a firebaseType and an appName undefined', () => {
      let firebaseTypeFixture: FirebaseType;

      beforeAll(() => {
        firebaseTypeFixture = Auth;
      });

      describe('when called', () => {
        let authFixture: Auth;
        let appFixture: App;

        let result: unknown;

        beforeAll(() => {
          authFixture = {} as Partial<Auth> as Auth;
          appFixture = {} as Partial<App> as App;

          (initializeApp as jest.Mock<App>).mockReturnValueOnce(appFixture);
          (getAuth as jest.Mock<Auth>).mockReturnValueOnce(authFixture);

          const appOptionsFixture: AppOptions = {};

          const firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider = new FirebaseAdminCoreModuleProvider(
            appOptionsFixture,
          );

          result = firebaseAdminCoreModuleProvider.getProvider(firebaseTypeFixture);
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
    });

    describe('having a firebaseType and an appName', () => {
      let firebaseTypeFixture: FirebaseType;
      let appName: string;

      beforeAll(() => {
        firebaseTypeFixture = Auth;
        appName = 'app-name-example';
      });

      describe('when called and this.providers.get() returns undefined', () => {
        let authFixture: Auth;
        let appFixture: App;

        let result: unknown;

        beforeAll(() => {
          authFixture = {} as Partial<Auth> as Auth;
          appFixture = {} as Partial<App> as App;

          (initializeApp as jest.Mock<App>).mockReturnValueOnce(appFixture);
          (getAuth as jest.Mock<Auth>).mockReturnValueOnce(authFixture);

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
          expect((result as Error).message).toStrictEqual(`App ${appName} does not exist`);
        });
      });

      describe('when called and this.providers.get() returns a Provider', () => {
        let authFixture: Auth;
        let appFixture: App;

        let result: unknown;

        beforeAll(() => {
          authFixture = {} as Partial<Auth> as Auth;
          appFixture = {} as Partial<App> as App;

          (initializeApp as jest.Mock<App>).mockReturnValueOnce(appFixture);
          (getAuth as jest.Mock<Auth>).mockReturnValueOnce(authFixture);

          const appOptionsFixture: NestFirebaseAdminAppOptions = [{ appOptions: {}, name: appName }];

          const firebaseAdminCoreModuleProvider: FirebaseAdminCoreModuleProvider = new FirebaseAdminCoreModuleProvider(
            appOptionsFixture,
          );

          result = firebaseAdminCoreModuleProvider.getProvider(firebaseTypeFixture, appName);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a Provider', () => {
          expect(result).toStrictEqual(authFixture);
        });
      });
    });
  });
});
