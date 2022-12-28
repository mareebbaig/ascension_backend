module.exports = function SelectableRequestSchema(opts) {
    const { selectableRequestHandlers, Joi } = opts;

    const getSelectables = () => {
        return {
            method: "GET",
            url: "/getSelectables/:selectable",
            // schema: {
            //     querystring: {
            //         selectable: { type: "string" },
            //     },
            // },
            handler: selectableRequestHandlers.getSelectables,
        };
    };

    return {
        getSelectables,
    };
};
