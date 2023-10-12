/*
  Filename: util.js
  Author: Timothy Damir Kovacic
 */
const db = require("./db");

function getAllPrayerRequests(sdt, edt) {
    const db = require('./db');
    const resultSet = db.queryAllActivePrayerRequests(sdt, edt);
    return resultSet;
}

function createPrayerRequest(category, details) {
    const db = require('./db');
    const result = db.insertPrayerRequest(category, details);
    return result;
}

function editPrayerRequest(id, category, details) {
    const db = require('./db');
    const result = db.updatePrayerRequest(id, category, details);
    return result;
}

function deactivatePrayerRequest(id) {
    const db = require('./db');
    const result = db.delistPrayerRequest(id);
    return result;
}

function deletePrayerRequest(id) {
    const db = require('./db');
    const result = db.deletePrayerRequest(id);
    return result;
}

module.exports = {
    getAllPrayerRequests,
    createPrayerRequest,
    editPrayerRequest,
    deactivatePrayerRequest,
    deletePrayerRequest
};