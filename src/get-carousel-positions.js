import carouselScraper from 'google-carousel-scraper';

export default async function(searchTerm, publisher) {
	return (await carouselScraper(searchTerm)).filter((link, i) => {
		link.position = i;
		return link.publisher === publisher;
	});
};
