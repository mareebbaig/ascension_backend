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
            handler: listingRequestHandlers.createListing
        };
    };

    return {
        createListing,
    };
};
