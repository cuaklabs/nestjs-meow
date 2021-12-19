<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<h1 align="center">Nestjs Firebase Admin Module</h1>

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

export class CatService {
  constructor(private readonly auth: Auth) {}

  public doSomething(): void {

  }
}


