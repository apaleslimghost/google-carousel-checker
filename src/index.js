import getCarouselPositions from './get-carousel-positions';
import getSearchTerms from './get-search-terms';
import Gauge from 'gauge';
import series from '@quarterto/promise-series';

export default async function(options) {
	const gauge = new Gauge({
		theme: 'colorBrailleSpinner',
		enabled: !options.silent,
	});

	options.gauge = gauge;
	let progress = 0;
	const totalActions = options.query.rowLimit + 1;

	const searchTerms = await getSearchTerms(options);
	return await series(
		searchTerms.map(async function getTermCarousel(term) {
			options.gauge.show({
				section: 'get-search-terms',
				subsection: term.keys[0],
				completed: (++progress) / totalActions,
			});
			options.gauge.pulse('get-carousel-positions');
			const links = await getCarouselPositions(term.keys[0], options);
			return {term, links};
		})
	);
}
