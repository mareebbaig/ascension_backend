module.exports = function SelectableMediator(opts) {
    const { selectableService } = opts;
    async function getSelectables({ selectable }) {
        response = await selectableService.getSelectables(selectable);
        return response;
    }

    return {
        getSelectables,
    };
};
