module.exports = function Selectable() {
    return {
        getSelectables: "select * from ${table:name}",
        insertCities: "insert into cities (label) VALUES (${label})",
        insertIndustries: "insert into industries(label) values (${label}) returning id",
        insertLocations : "insert into location(city) values ",
        insertCountries:
            "insert into countries(label,cc) values ($(label),$(cc)) ",
        getIndustryId: "select id from industries where label = $(label)",
    };
};
