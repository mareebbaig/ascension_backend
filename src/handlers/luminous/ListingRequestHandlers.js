module.exports = function ListingRequestHandlers(opts) {
    const { listingMediator } = opts;

    async function createListing(request, reply) {
        try {
            const { body } = request;

            const { sellerId } = request.params;

            body.seller = sellerId;

            const response = await listingMediator.createListing(body);

            reply.send(response);
        } catch (e) {
            console.log(e.message);
            reply.send(e);
        }
    }

    return {
        createListing,
    };
};
