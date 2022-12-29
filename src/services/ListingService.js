module.exports = function ListingService(opts) {
    const { db, listing } = opts;
    //async function createListing(title,headline,description,reason_for_selling,industry,location,is_auctioned,is_established,seller) {
    async function createListing(listingFormData) {
        console.log("listingFormData: ", listingFormData);

        const { price } = listingFormData;

        const priceResult = await db["primary"].query(
            listing.insertPrice,
            price
        );

        const priceId = priceResult[0]["id"];

        console.log("title", listingFormData.title);

        const result = await db["primary"].query(listing.createListing, {
            title: listingFormData.title,
            headline: listingFormData.headline,
            description: listingFormData.description,
            reason_for_selling: listingFormData.reason_for_selling,
            industry: listingFormData.industry,
            location: listingFormData.location,
            is_auctioned: listingFormData.is_auctioned,
            is_established: listingFormData.is_established,
            price: priceId,
            seller: listingFormData.seller,
        });

        return result;
    }
    return {
        createListing,
    };
};
