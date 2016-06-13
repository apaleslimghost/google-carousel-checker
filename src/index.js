import getCarouselPositions from './get-carousel-positions';
import getSearchTerms from './get-search-terms';

export default async function(options) {
	const searchTerms = await getSearchTerms(options);
	return await Promise.all(
		searchTerms.map(async function(term) {
			const links = await getCarouselPositions(term.keys[0]);
			return {term, links};
		})
	);
}
