import { Inject } from '@nestjs/common';

import { FirebaseType } from '../models/FirebaseType';
import { getFirebaseProviderId } from './getFirebaseProviderId';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectFirebaseProvider: (
  firebaseType: FirebaseType,
  appName?: string | undefined,
) => ParameterDecorator = (firebaseType: FirebaseType, appName?: string): ParameterDecorator =>
  Inject(getFirebaseProviderId(firebaseType, appName));
