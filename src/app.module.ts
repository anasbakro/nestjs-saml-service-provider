import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import app from './config/app';
import saml from './config/saml';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SamlStrategy } from './strategy/saml.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env', '.env.example'],
      load: [app, saml]
    }),
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: '600s' },
    }),

  ],
  controllers: [AppController],
  providers: [SamlStrategy, JwtStrategy, JwtAuthGuard, AppService, AuthService, UserService],
})
export class AppModule { }
