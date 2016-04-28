import 'dotenv/config';
import checkCarousel from './src';
import util from 'util';

checkCarousel('ft.com', {
	query: {
		rowLimit: 5
	},
	auth: {
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.REFRESH_TOKEN,
	}
}).then(a => util.inspect(a, {depth:null}), e => e.stack).then(console.log);
