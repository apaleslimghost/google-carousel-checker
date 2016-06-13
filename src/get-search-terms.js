import {webmasters} from 'google-api-client';
import moment from 'moment';
import getAccessToken from './access-token';

export default async function(options) {
	const {accessToken, clientId} = await getAccessToken(options.auth);
	let o;
	const results = await webmasters.searchAnalytics.query('www.ft.com', {
		endDate: moment().format('YYYY-MM-DD'),
		startDate: moment().subtract(1, 'week').format('YYYY-MM-DD'),
		dimensions: ['query'],
		dimensionFilterGroups: [{
			groupType: 'and',
			filters: [
				{
					dimension: 'device',
					operator: 'equals',
					expression: 'MOBILE',
				},
				...(options.excludeQueries || []).map(expression => ({
					dimension: 'query',
					operator: 'notEquals',
					expression,
				})),
			],
		}],
		...options.query,
	}, accessToken, clientId);

	if(!results[1].rows) {
		throw new Error('Not enough data from Google search analytics');
	}

	return results[1].rows;
}
