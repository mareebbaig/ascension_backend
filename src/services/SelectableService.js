module.exports = function SelectableService(opts) {
    const { db, selectable } = opts;
    async function getSelectables(selectableIdentifier) {
        result = await db["primary"].any(selectable.getSelectables, {
            table: selectableIdentifier,
        });

        return result;
    }
    return {
        getSelectables,
    };
};
