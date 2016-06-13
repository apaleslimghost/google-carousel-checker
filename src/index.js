import getCarouselPositions from './get-carousel-positions';
import getSearchTerms from './get-search-terms';
import groupBy from 'lodash.groupby';
import mapValues from 'lodash.mapvalues';
import gaussian from '@quarterto/gaussian';

export default async function(options) {
	const searchTerms = await getSearchTerms(options);
	return await Promise.all(
		searchTerms.map(async function(term) {
			const links = mapValues(
				groupBy(
					await getCarouselPositions(term.keys[0]), 'publisher'
				),
				results => gaussian(results.map(({position}) => position))
			);
			return {term, links};
		})
	);
}
