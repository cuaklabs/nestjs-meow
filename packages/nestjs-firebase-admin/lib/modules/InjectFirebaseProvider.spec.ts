jest.mock('./getFirebaseProviderId');
// eslint-disable-next-line import/no-unresolved
import { Auth } from 'firebase-admin/auth';

import { FirebaseInstance, FirebaseType } from '../models/FirebaseType';
import { getFirebaseProviderId } from './getFirebaseProviderId';
import { InjectFirebaseProvider } from './InjectFirebaseProvider';

describe(InjectFirebaseProvider.name, () => {
  describe('having a firebaseType', () => {
    let firebaseType: FirebaseType;

    beforeAll(() => {
      firebaseType = Auth;
    });

    describe('when called', () => {
      let targetFixture: unknown;

      beforeAll(async () => {
        (getFirebaseProviderId as jest.Mock<string | FirebaseType>).mockReturnValueOnce(firebaseType);

        class TargetFixture {
          constructor(@InjectFirebaseProvider(firebaseType) private readonly foo: FirebaseInstance) {}
        }

        // const moduleRef: TestingModule = await Test.createTestingModule({
        //   providers: [
        //     TargetFixture,
        //     {
        //       provide: firebaseType,
        //       useValue: {},
        //     },
        //   ],
        // }).compile();
        targetFixture = TargetFixture;
      });

      afterAll(() => {
        jest.clearAllMocks();
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
      let targetFixture: unknown;

      beforeAll(async () => {
        (getFirebaseProviderId as jest.Mock<string | FirebaseType>).mockReturnValueOnce(firebaseType);

        class TargetFixture {
          constructor(@InjectFirebaseProvider(firebaseType, appName) private readonly foo: FirebaseInstance) {}
        }

        // const moduleRef: TestingModule = await Test.createTestingModule({
        //   providers: [
        //     TargetFixture,
        //     {
        //       provide: firebaseType,
        //       useValue: {},
        //     },
        //   ],
        // }).compile();
        targetFixture = TargetFixture;
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call getFirebaseProviderId', () => {
        expect(getFirebaseProviderId).toHaveBeenCalledTimes(1);
        expect(getFirebaseProviderId).toHaveBeenCalledWith(firebaseType, appName);
      });
    });
  });
});
