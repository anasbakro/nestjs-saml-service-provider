
import { registerAs } from '@nestjs/config';

export default registerAs('saml', () => ({
	cert: process.env.SAML_CERT,
	entryPoint: process.env.SAML_ENTRY_POINT,
	wantAssertionsSigned: true,
	acceptedClockSkewMs: -1
}));

