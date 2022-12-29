module.exports = function Listing() {
    return {
        insertPrice:
            "insert into prices (asking_price,net_income,cash_flow,gross_revenue,inventory_price,ebitda) values ($(asking_price),$(net_income),$(cash_flow),$(gross_revenue),$(inventory_price),$(ebitda)) returning id",
        createListing:
            "insert into listing(title,headline,description,reason_for_selling,industry,location,is_auctioned,is_established,price,seller) values ($(title),$(headline),$(description),$(reason_for_selling),$(industry),$(location),$(is_auctioned),$(is_established),$(price),$(seller))",
    };
};
