module.exports = function Selectable() {
    return {
        getSelectables: "select * from ${table:name}",
    };
};
