console.log('3333333333333333333333333333333333333333333333' + process.env.pgsql_host);
console.log('3333333333333333333333333333333333333333333333' + process.env.pgsql_pass);

function getAllPrayerRequests() {
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