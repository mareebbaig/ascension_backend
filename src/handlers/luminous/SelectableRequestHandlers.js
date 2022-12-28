module.exports = function SelectableRequestSchema(opts) {
    async function getSelectables(request, reply) {
        const { selectable } = request.params;
       
        
       
        console.log(selectable);
    }

    return {
        getSelectables,
    };
};
