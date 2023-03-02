module.exports = function ListingRequestHandlers(opts) {
    const { listingMediator, axios } = opts;

    async function createListing(request, reply) {
        try {
            const { body } = request;

            const { sellerId } = request.params;

            body.seller = sellerId;

            const response = await listingMediator.createListing(body);

            reply.send(response);
        } catch (e) {
            console.log(e);
            reply.send(e);
        }
    }
    async function getSingleListing(request, reply) {
        try {
            const { businessId } = request.params;
            console.log(request.params);

            const response = await listingMediator.getSingleListing(businessId);
            reply.send(response);
        } catch (e) {
            console.log(e);
            reply.send(e);
        }
    }

    async function getIDsFromPythonServer(niche) {
        try {
            const res = await axios({
                method: "get",
                url: `http://127.0.0.1:8000/getSimilarBusiness/${niche}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return res.data;
        } catch (e) {
            // console.log(e);
            return e.message;
        }
    }

    async function getSimiliarListing(request, reply) {
        try {
            const { niche } = request.params;
            console.log(niche);
            const ids = await getIDsFromPythonServer(niche);
            const response = await listingMediator.getSimiliarListing(ids.key);
            reply.send(response);
        } catch (e) {
            console.log(e.message);
            reply.send(e.message);
        }
    }

    return {
        createListing,
        getSingleListing,
        getSimiliarListing,
    };
};
