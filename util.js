function getAllPrayerRequests() {
    console.log(process.env.pgsql_host);
    console.log(process.env.pgsql_pass);
    const db = require('./db');
    const resultSet = db.queryAllActivePrayerRequests();
    console.log(resultSet);
    return resultSet;
}

function createPrayerRequest(category, details) {
    const db = require('./db');
    const result = db.insertPrayerRequest(category, details);
    return result;
}

module.exports = {
    getAllPrayerRequests,
    createPrayerRequest
};