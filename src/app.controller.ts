import { Controller, Get, Res, UseGuards, Post, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { resolve } from 'path';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SamlAuthGuard } from './guard/saml-auth.guard';
import { User } from './model/user';
import { SamlStrategy } from './strategy/saml.strategy';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly samlStrategy: SamlStrategy,
    private readonly authService: AuthService,
    private readonly userService: UserService,

  ) { }

  @Get()
  async homepage(@Res() res: Response) {
    res.sendFile(resolve('web/index.html'));
  }


  @Get('api/auth/sso/saml/login')
  @UseGuards(SamlAuthGuard)
  async samlLogin() {
    //this route is handled by passport-saml
    return;
  }

  @Get('api/auth/sso/saml/metadata')
  async getSpMetadata(@Res() res: Response) {
    const ret = this.samlStrategy.generateServiceProviderMetadata(null, null);
    res.type('application/xml');
    res.send(ret);
  }

  @Post('api/auth/sso/saml/ac')
  @UseGuards(SamlAuthGuard)
  async samlAssertionConsumer(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    //this routes gets executed on successful assertion from IdP
    if (req.user) {
      const user = req.user as User;
      const jwt = this.authService.getTokenForUser(user);
      this.userService.storeUser(user);
      res.redirect('/?jwt=' + jwt);
      
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

}
