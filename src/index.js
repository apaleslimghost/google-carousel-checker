import getCarouselPositions from './get-carousel-positions';
import getSearchTerms from './get-search-terms';

export default async function(publisher, options) {
	const searchTerms = await getSearchTerms(options);
	return await Promise.all(
		searchTerms.map(async function(term) {
			const links = await getCarouselPositions(term, publisher);
			return {term, links};
		})
	);
}
