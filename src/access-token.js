import {oauth2} from 'google-api-client';

let accessToken = process.env.ACCESS_TOKEN;

export default async function({refreshToken, clientId, clientSecret}) {
	if(!accessToken || !await oauth2.isTokenValid(accessToken)){
		accessToken = await oauth2.refreshToken(refreshToken, clientId, clientSecret);
	}

	return {accessToken, clientId};
}
