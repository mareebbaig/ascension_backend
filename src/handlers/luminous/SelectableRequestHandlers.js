module.exports = function SelectableRequestHandlers(opts) {
    const { selectableMediator } = opts;
    async function getSelectables(request, reply) {
        try {
            const response = await selectableMediator.getSelectables(
                request.params
            );
            console.log(response);
            reply.send(response);
        } catch (e) {
            console.log(e);
            reply.send(e);
        }
    }

    return {
        getSelectables,
    };
};
