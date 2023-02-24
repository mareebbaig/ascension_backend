module.exports = function ScrappingHandler(opts) {
    const { axios } = opts;

    async function scrapData() {
        // https://api.empireflippers.com/api/v1/listings/list?limit=3?page=20

        // for(let i = 0 ; i <= 20 ; ++i ){
        const { data } = await axios.get(
            `https://api.empireflippers.com/api/v1/listings/list?page=1`
        );
        // console.log(data.data);
        const { listings } = data.data;

        listings.map((listing) => {
            console.log(listing);
        });

        // }
        return listings;
    }
    return {
        scrapData,
    };
};
