import { beforeAll, describe, expect, it } from '@jest/globals';

import { Auth } from 'firebase-admin/auth';

import { getFirebaseProviderId } from './getFirebaseProviderId';
import { FirebaseType } from '../models/FirebaseType';

describe(getFirebaseProviderId.name, () => {
  describe('having a FirebaseType', () => {
    let firebaseType: FirebaseType;

    beforeAll(() => {
      firebaseType = Auth;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getFirebaseProviderId(firebaseType);
      });

      it(`should return Auth`, () => {
        expect(result).toBe(firebaseType);
      });
    });
  });

  describe('having a FirebaseType and an appName', () => {
    let appName: string;
    let firebaseType: FirebaseType;

    beforeAll(() => {
      firebaseType = Auth;
      appName = 'appName-example';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getFirebaseProviderId(firebaseType, appName);
      });

      it(`should return appName-example_Auth`, () => {
        expect(result).toBe(`${appName}_${firebaseType.name}`);
      });
    });
  });
});
