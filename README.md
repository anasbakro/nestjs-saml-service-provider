# NestJS SAML Service Provider Sample

Credits: [https://medium.com/@andrea_cioni/nestjs-authentication-single-sign-on-with-saml-2-0-8e95f0b8872c](https://medium.com/@andrea_cioni/nestjs-authentication-single-sign-on-with-saml-2-0-8e95f0b8872c)

## Installation

### Development
- Clone repo
- `yarn install`
- Copy `.env.example` to `.env` and fill out the environment variables:
	- SAML_CERT
	- SAML_ENTRY_POINT
	- APP_URL
- `npm run start:dev`
- Export xml at `${APP_URL}/api/auth/sso/saml/metadata` to the identify provider for example `https://samltest.id/upload.php`
### Production
- Build the docker image `docker build -t dev/nestjs/saml .`
- Run the image and map external port to port 3000 and fill out the environment variables.
- Export xml at `${APP_URL}/api/auth/sso/saml/metadata` to the identify provider `https://samltest.id/upload.php`


# CI/CD
The repo contains github actions implementation to build and push the image to AWS ECR, you can override it to use other providers and then add the CD there as well.

