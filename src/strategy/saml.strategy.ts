import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-saml';
import { User } from '../model/user';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService
	) {
		super({
			//TODO: USE ENV
			issuer: 'saml2-nest-poc',
			callbackUrl: configService.get('app.url') + '/api/auth/sso/saml/ac',
			cert: configService.get('saml.cert'),
			entryPoint: configService.get('saml.entryPoint'),
			wantAssertionsSigned: configService.get('saml.wantAssertionsSigned'),
			acceptedClockSkewMs: configService.get<number>('saml.acceptedClockSkewMs')
		});
	}

	async validate(profile: Profile) {
		try {
			const user: User = {
				username: profile['urn:oid:0.9.2342.19200300.100.1.1'] as string,
				email: profile.mail as string,
				issuer: profile.issuer as string,
				phone: profile['urn:oid:2.5.4.20'] as string,
			};
			return user;
		} catch (e) {
			throw new ForbiddenException('invalid user attributes');
		}
	}
}