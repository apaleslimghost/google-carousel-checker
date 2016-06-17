import carouselScraper from 'google-carousel-scraper';

export default async function(searchTerm, options) {
	options.gauge.pulse(`carousel-scraper ${searchTerm}`);
	const links = await carouselScraper(searchTerm);

	options.gauge.pulse('carousel-scraper positions');
	return links.map((link, i) => {
		link.position = i + 1;
		return link;
	});
};
