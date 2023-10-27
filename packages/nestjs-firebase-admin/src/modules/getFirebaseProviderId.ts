import { FirebaseType } from '../models/FirebaseType';

export function getFirebaseProviderId(
  firebaseType: FirebaseType,
  appName?: string,
): string | FirebaseType {
  return appName === undefined
    ? firebaseType
    : `${appName}_${firebaseType.name}`;
}
