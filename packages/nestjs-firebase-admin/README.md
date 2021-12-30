<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<h1 align="center">Nestjs Firebase Admin Module</h1>

<p align="center">
  <a href="https://github.com/cuaklabs/nestjs-meow/workflows/build/badge.svg">
    <img src="https://github.com/cuaklabs/nestjs-meow/workflows/build/badge.svg" alt="Build status"/>
  </a>

  <a href="https://codecov.io/gh/cuaklabs/nestjs-meow">
    <img src="https://codecov.io/gh/cuaklabs/nestjs-meow/branch/master/graph/badge.svg?token=SA47S3AN5P" alt="Coverage status"/>
  </a>
</p>

## Description

[Firebase Admin](https://firebase.google.com/docs/reference/admin/node) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm i --save firebase-admin @cuaklabs/nestjs-firebase-admin
```

## Quick Start

#### Initialization

```ts
import { FirebaseAdminModule } from '@cuaklabs/nestjs-firebase-admin';

@Module({
  imports: [FirebaseAdminModule.forRoot()],
})
export class AppModule {}
```

```ts
import { FirebaseAdminModule } from '@cuaklabs/nestjs-firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppOptions } from 'firebase-admin';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): AppOptions => {
        return {
          databaseURL: configService.get('DATABASE_URL'),
        };
      },
    }),

  ],
})
export class AppModule {}
```

#### Inject Providers

```ts
import { Auth } from 'firebase-admin/auth';
import { CatService } from './CatService';
import { FirebaseAdminModule } from '@cuaklabs/nestjs-firebase-admin';

@Module({
  imports: [FirebaseAdminModule.injectProviders([Auth])],
  providers: [CatService],
})
export class CatModule {}
```

```ts
import { Auth } from 'firebase-admin/auth';
import { InjectFirebaseProvider } from '@cuaklabs/nestjs-firebase-admin';

export class CatService {
  constructor(@InjectFirebaseProvider(Auth) private readonly auth: Auth) {}

  public doSomething(): void {

  }
}
```

## Multiple apps/connections

#### Initialization

```ts
import { FirebaseAdminModule } from '@cuaklabs/nestjs-firebase-admin';

@Module({
  imports: [FirebaseAdminModule.forRoot([{ name: 'app-name' }])],
})
export class AppModule {}
```

```ts
import { FirebaseAdminModule } from '@cuaklabs/nestjs-firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppOptions } from 'firebase-admin';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): AppOptions => {
        return [
          { 
            name: 'app-name',
            appOptions: {
              databaseURL: configService.get('DATABASE_URL'),
            },
          },
        ];
      },
    }),

  ],
})
export class AppModule {}
```

#### Inject Providers

```ts
import { Auth } from 'firebase-admin/auth';
import { CatService } from './CatService';
import { FirebaseAdminModule } from '@cuaklabs/nestjs-firebase-admin';

@Module({
  imports: [FirebaseAdminModule.injectProviders([Auth], 'app-name')],
  providers: [CatService],
})
export class CatModule {}
```

```ts
import { Auth } from 'firebase-admin/auth';
import { InjectFirebaseProvider } from '@cuaklabs/nestjs-firebase-admin';

export class CatService {
  constructor(@InjectFirebaseProvider(Auth, 'app-name') private readonly auth: Auth) {}

  public doSomething(): void {

  }
}
```



