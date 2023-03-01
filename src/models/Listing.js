module.exports = function Listing() {
    return {
        insertPrice:
            "insert into prices (asking_price,net_income,cash_flow,gross_revenue,inventory_price) values ($(asking_price),$(net_income),$(cash_flow),$(gross_revenue),$(inventory_price)) returning id",
        createListing:
            "insert into listing(id,title,description,reason_for_selling,industry,location,is_auctioned,is_established,price,seller,assets,opportunities,risks) values ($(id),$(title),$(description),$(reason_for_selling),$(industry),$(location),$(is_auctioned),$(is_established),$(price),$(seller), $(assets), $(opportunities),$(risks)) returning id",
    };
};
