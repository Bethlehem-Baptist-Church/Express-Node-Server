function getAllPrayerRequests() {
    const db = require('./db');
    const resultSet = db.queryAllActivePrayerRequests();
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