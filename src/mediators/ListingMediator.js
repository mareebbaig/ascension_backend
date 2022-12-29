module.exports = function ListingMediator(opts) {
    const { listingService } = opts;

    async function createListing(listingFormData) {
        response = await listingService.createListing(listingFormData);

        return response;
    }

    return {
        createListing,
    };
};
