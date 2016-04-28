import {webmasters} from 'google-api-client';
import moment from 'moment';
import getAccessToken from './access-token';

export default async function(options) {
	const {accessToken, clientId} = await getAccessToken(options.auth);

	const results = await webmasters.searchAnalytics.query('www.ft.com', {
		endDate: moment().format('YYYY-MM-DD'),
		startDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
		dimensions: ['query'],
		...options.query
	}, accessToken, clientId);

	return results[1].rows
		.map(row => row.keys[0])
		.filter(options.filterTerms || (a => a));
}
