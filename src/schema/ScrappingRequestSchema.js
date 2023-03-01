module.exports = function ScrappingRequestSchema(opts) {
    const { scrappingHandler, Joi } = opts;

    const getSelectables = () => {
        return {
            method: "GET",
            url: "/scrapData",
            // schema: {
            //     querystring: {
            //         selectable: { type: "string" },
            //     },
            // },
            handler: scrappingHandler.scrapData,
        };
    };

    return {
        getSelectables,
    };
};
