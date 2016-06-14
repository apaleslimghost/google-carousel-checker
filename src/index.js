import getCarouselPositions from './get-carousel-positions';
import getSearchTerms from './get-search-terms';
import Gauge from 'gauge';

export default async function(options) {
	const gauge = new Gauge({
		theme: 'colorBrailleSpinner',
		enabled: !options.silent,
	});

	options.gauge = gauge;
	let progress = 0;
	const totalActions = options.query.rowLimit + 1;

	const searchTerms = await getSearchTerms(options);
	return await Promise.all(
		searchTerms.map(async function getTermCarousel(term) {
			const links = await getCarouselPositions(term.keys[0], options);
			options.gauge.show({
				section: 'get-search-terms',
				subsection: term.keys[0],
				completed: (++progress) / totalActions,
			});
			return {term, links};
		})
	);
}
