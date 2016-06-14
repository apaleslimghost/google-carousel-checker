import carouselScraper from 'google-carousel-scraper';

export default async function(searchTerm, options) {
	return (await carouselScraper(searchTerm)).map((link, i) => {
		link.position = i + 1;
		options.gauge.pulse();
		return link;
	});
};
