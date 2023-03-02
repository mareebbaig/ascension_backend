module.exports = function ListingMediator(opts) {
    const { listingService } = opts;

    async function createListing(listingFormData) {
        response = await listingService.createListing(listingFormData);

        return response;
    }
    async function getSingleListing(businessId) {
        const response = await listingService.getSingleListing(businessId);
        return response;
    }

    async function getSimiliarListing(ids) {
        const result = await listingService.getSimiliarListing(ids);
        return result;
    }

    return {
        createListing,
        getSingleListing,
        getSimiliarListing,
    };
};
