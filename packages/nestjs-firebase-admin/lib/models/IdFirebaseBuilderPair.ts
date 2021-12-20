import { FirebaseInstance, FirebaseType } from './FirebaseType';

export interface IdFirebaseBuilderPair {
  id: FirebaseType;
  builder: () => FirebaseInstance;
}
