const pgp = require("pg-promise")();

module.exports = function ListingService(opts) {
    const { db, listing, _ } = opts;

    async function createListing(listingFormData) {
        const { price } = listingFormData;

        const { images } = listingFormData;

        const result = await db["primary"].tx(async (t) => {
            const priceResult = await t.query(listing.insertPrice, price);

            const priceId = priceResult[0]["id"];

            console.log(
                "here ----------------------------------->",
                listingFormData.assets
            );

            const listingResult = await t.query(listing.createListing, {
                id: listingFormData.id,
                title: listingFormData.title,
                description: listingFormData.description,
                reason_for_selling: listingFormData.reason_for_selling,
                industry: listingFormData.industry,
                location: listingFormData.location,
                is_auctioned: listingFormData.is_auctioned,
                is_established: listingFormData.is_established,
                price: priceId,
                seller: listingFormData.seller,
                assets: listingFormData.assets,
                opportunities: listingFormData.opportunities,
                risks: listingFormData.risks,
            });

            const listingId = listingResult[0]["id"];

            if (!_.isEmpty(images)) {
                const cs = new pgp.helpers.ColumnSet(
                    ["listing_id", "image_url"],
                    {
                        table: "images",
                    }
                );

                const values = images.map((image) => {
                    return { listing_id: listingId, image_url: image };
                });

                const imageQuery = pgp.helpers.insert(values, cs);

                const result = await t.query(imageQuery);

                return result;
            } else {
                return [];
            }
        });
        return result;
    }
    return {
        createListing,
    };
};
