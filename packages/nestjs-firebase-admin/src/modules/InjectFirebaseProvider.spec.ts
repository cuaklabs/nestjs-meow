import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('@nestjs/common', () => ({ Inject: jest.fn() }));

import { Inject } from '@nestjs/common';
import { Auth } from 'firebase-admin/auth';

jest.mock('./getFirebaseProviderId');

import { getFirebaseProviderId } from './getFirebaseProviderId';
import { InjectFirebaseProvider } from './InjectFirebaseProvider';
import { FirebaseType } from '../models/FirebaseType';

describe(InjectFirebaseProvider.name, () => {
  describe('having a firebaseType', () => {
    let firebaseType: FirebaseType;

    beforeAll(() => {
      firebaseType = Auth;
    });

    describe('when called', () => {
      beforeAll(async () => {
        (getFirebaseProviderId as jest.Mock<typeof getFirebaseProviderId>).mockReturnValueOnce(firebaseType);

        InjectFirebaseProvider(firebaseType);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call Inject()', () => {
        expect(Inject).toHaveBeenCalledTimes(1);
        expect(Inject).toHaveBeenCalledWith(firebaseType);
      });

      it('should call getFirebaseProviderId', () => {
        expect(getFirebaseProviderId).toHaveBeenCalledTimes(1);
        expect(getFirebaseProviderId).toHaveBeenCalledWith(firebaseType, undefined);
      });
    });
  });

  describe('having a firebaseType and an appName', () => {
    let firebaseType: FirebaseType;
    let appName: string;

    beforeAll(() => {
      firebaseType = Auth;
      appName = 'app-name-example';
    });

    describe('when called', () => {
      beforeAll(async () => {
        (getFirebaseProviderId as unknown as jest.Mock<typeof getFirebaseProviderId>).mockReturnValueOnce(firebaseType);

        InjectFirebaseProvider(firebaseType, appName);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call Inject()', () => {
        expect(Inject).toHaveBeenCalledTimes(1);
        expect(Inject).toHaveBeenCalledWith(firebaseType);
      });

      it('should call getFirebaseProviderId', () => {
        expect(getFirebaseProviderId).toHaveBeenCalledTimes(1);
        expect(getFirebaseProviderId).toHaveBeenCalledWith(firebaseType, appName);
      });
    });
  });
});
