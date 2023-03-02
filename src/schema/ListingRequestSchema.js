module.exports = function ListingRequestSchema(opts) {
    const { listingRequestHandlers, Joi } = opts;

    const createListing = () => {
        return {
            method: "POST",
            url: "/createListing/:sellerId",
            // schema: {
            //     querystring: {
            //         selectable: { type: "string" },
            //     },
            // },
            handler: listingRequestHandlers.createListing,
        };
    };
    const getSimiliarListing = () => {
        return {
            method: "GET",
            url: "/getSimilarlisitng/:niche",
            handler: listingRequestHandlers.getSimiliarListing,
        };
    };
    const getSingleListing = () => {
        return {
            method: "GET",
            url: "/getSingleListing/:businessId",
            handler: listingRequestHandlers.getSingleListing,
        };
    };

    return {
        createListing,
        getSimiliarListing,
        getSingleListing,
    };
};
