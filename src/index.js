import getCarouselPositions from './get-carousel-positions';
import getSearchTerms from './get-search-terms';
import groupBy from 'lodash.groupby';

export default async function(options) {
	const searchTerms = await getSearchTerms(options);
	return await Promise.all(
		searchTerms.map(async function(term) {
			const links = groupBy(await getCarouselPositions(term), 'publisher');
			return {term, links};
		})
	);
}
