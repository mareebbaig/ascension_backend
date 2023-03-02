module.exports = function ScrappingHandler(opts) {
    const {
        axios,
        guid,
        _,
        selectableRequestHandlers,
        bcrypt,
        authMediator,
        listingMediator,
    } = opts;

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    async function insertNewUser() {
        try {
            const { data } = await axios.get("https://randomuser.me/api/");
            const { results } = data;
            const user = _.first(results);
            const newUser = {
                user_id: await guid.v1(),
                first_name: user.name.first,
                last_name: user.name.last,
                email: user.email,
                password: await bcrypt.hash(user.login.password, 10),
                user_type: 2,
                title: "Owner",
            };

            res = await authMediator.signUp({ ...newUser });

            return _.first(res).user_id;
        } catch (e) {
            console.log(e.message);
        }

        // console.log(result);

        // const result =

        // body.password =
    }

    // function

    async function scrapData() {
        console.log("here -------------------->");

        try {
            for (let i = 1; i <= 2; ++i) {
                const { data } = await axios.get(
                    `https://api.empireflippers.com/api/v1/listings/list?page=${i}&limit=100`
                );
                const { listings } = data.data;

                listings.forEach(async (listing) => {
                    // const   = await axios.get('')
                    if (
                        listing.id != null &&
                        listing.public_title != null
                        // // listing.summary != null &&
                        // listing.listing_price != null &&
                        // listing.average_monthly_net_profit != null &&
                        // lising.average_monthly_expenses != null &&
                        // listing.inventory_cost != null
                    ) {
                        const newListing = {
                            id: listing.id,
                            title: listing.public_title,
                            description: listing.summary,
                            reason_for_selling: listing.reason_for_sale,
                            price: {
                                asking_price: listing.listing_price,
                                net_income: listing.average_monthly_net_profit,
                                gross_revenue:
                                    listing.average_monthly_gross_revenue,
                                cash_flow: listing.average_monthly_expenses,
                                inventory_price: listing.inventory_cost,
                            },
                            is_auctioned: _.sample([true, false]),
                            is_established: _.sample([true, false]),
                            industry:
                                await selectableRequestHandlers.getIndustryId(
                                    _.first(listing.niches).niche
                                ),
                            location: 1,
                            images: [
                                "https://cloudinary.hbs.edu/hbsit/image/upload/s--Fm3oHP0m--/f_auto,c_fill,h_375,w_750,/v20200101/79015AB87FD6D3284472876E1ACC3428.jpg",
                            ],
                            seller: await insertNewUser(),
                            assets: listing.assets_included,
                            opportunities: listing.opportunities,
                            risks: listing.risks,
                        };

                        res = await listingMediator.createListing(newListing);

                        await timer(3000);
                    } else {
                        console.log("listing here ------------->", listing.id);
                    }
                });
                await timer(2000);
                //  setTimeout(() => {}, 10000);
            }
            // console.log("length---------------------------> ", listings.length);
            // return;
            return "Success";
        } catch (e) {
            console.log(e.message);
        }
    }
    return {
        scrapData,
    };
};
