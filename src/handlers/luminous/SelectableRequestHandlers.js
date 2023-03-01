const getData = require("../../tempData.js");

module.exports = function SelectableRequestHandlers(opts) {
    const { selectableMediator, selectable, db, _ } = opts;
    async function getSelectables(request, reply) {
        try {
            const response = await selectableMediator.getSelectables(
                request.params
            );
            reply.send(response);
        } catch (e) {
            console.log(e.message);
            reply.send(e);
        }
    }

    async function fillSelectables(request, reply) {
        try {
            const data = getData();
            const { cities } = data;
            const { industries } = data;
            const { countries } = data;

            cities.forEach(async (city) => {
                await db["primary"].any(selectable.insertCities, {
                    label: city,
                });
            });

            industries.forEach(async (industry) => {
                await db["primary"].any(selectable.insertIndustries, {
                    label: industry,
                });
            });

            countries.map(async (country) => {
                await db["primary"].any(selectable.insertCountries, {
                    label: country.name,
                    cc: country.isoCode,
                });
            });

            return 1;
        } catch (e) {
            console.log(e.message);
            return e;
        }
    }

    async function getIndustryId(nicheName) {
        result = await db["primary"].query(selectable.getIndustryId, {
            label: nicheName,
        });
        return _.first(result).id;
    }

    return {
        getSelectables,
        fillSelectables,
        getIndustryId,
    };
};
