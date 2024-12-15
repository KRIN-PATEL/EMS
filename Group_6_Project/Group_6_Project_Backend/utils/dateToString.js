const dateToString = (date) => {
    return new Date(date).toLocaleDateString("sv-SE");
};

module.exports = dateToString;
