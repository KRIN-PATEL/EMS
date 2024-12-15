const stringToDate = (string) => {
    const parsedDate = new Date(string);
    if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    return "";
};

module.exports = stringToDate;
