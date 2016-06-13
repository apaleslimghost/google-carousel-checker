import carouselScraper from 'google-carousel-scraper';

export default async function(searchTerm) {
	return (await carouselScraper(searchTerm)).map((link, i) => {
		link.position = i;
		return link;
	});
};
