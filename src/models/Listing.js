module.exports = function Listing() {
    return {
        insertPrice:
            "insert into prices (asking_price,net_income,cash_flow,gross_revenue,inventory_price,ebitda) values ($(asking_price),$(net_income),$(cash_flow),$(gross_revenue),$(inventory_price),$(ebitda)) returning id",
        createListing:
            "insert into listing(title,headline,description,reason_for_selling,industry,location,is_auctioned,is_established,price,seller) values ($(title),$(headline),$(description),$(reason_for_selling),$(industry),$(location),$(is_auctioned),$(is_established),$(price),$(seller)) returning id",

        getSingleListing:
            "select Li.title, Li.description ,  li.reason_for_selling , Li.is_auctioned , Li.is_established , Li.seller , Ind.label as industry , C.label AS country , P.asking_price , P.cash_flow , P.gross_revenue , P.inventory_price , P.net_income  from listing AS Li INNER JOIN industries AS Ind on Li.industry = Ind.id INNER JOIN locations AS Lo ON Li.location = Lo.id INNER JOIN countries AS C on C.id = Lo.country INNER JOIN prices AS P ON Li.price = p.id where Li.id = ${businessId}",

        getSimiliarListing: "",
    };
};
