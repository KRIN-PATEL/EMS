const { GraphQLScalarType } = require("graphql");
const dateToString = require("../utils/dateToString");
const stringToDate = require("../utils/stringToDate");

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date Scalar",
    serialize: (value) => {
        return dateToString(value);
    },
    parseValue: (value) => {
        return stringToDate(value);
    },
});

module.exports = dateScalar;
