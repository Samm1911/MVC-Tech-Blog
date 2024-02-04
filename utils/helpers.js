// export format date helper
module.exports = {
    format_date: (date) => {
        // returns data in YYYY/MM/DD
        return date.toLocaleDateString();
    }
};