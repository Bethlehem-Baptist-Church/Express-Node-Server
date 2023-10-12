/*
  Filename: db.js
  Author: Timothy Damir Kovacic
 */
const { Client } = require('pg');
let dbConfig = {
    user: 'postgres',
    password: process.env.pgsql_pass,
    database: 'postgres',
    host: '/cloudsql/bb-church:us-central1:bb-church-pgsql',
    port: 5432,
    ssl: false
};
if(process.env.NODE_ENV === 'local') {
    const settings = require('./config/localSettings.json');
    dbConfig.password = settings.pgsql_pass.toString();
    dbConfig.host = settings.pgsql_host.toString();
}
async function queryAllActivePrayerRequests() {
    const dbClient = new Client(dbConfig);
    return new Promise((resolve, reject) => {
        try {
            dbClient.connect().then(() => {
                const query = `SELECT * FROM prayer_request WHERE request_status IN ('active','pending');`;
                dbClient.query(query).then((result) => {
                    dbClient.end();
                    resolve(result.rows);
                });
            });
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }
    });
}
async function insertPrayerRequest(input_category, input_details) {
    const input_dt = Math.round(new Date().getTime() / 1000);
    const input_status = 'pending';
    const dbClient = new Client(dbConfig);
    return new Promise((resolve, reject) => {
        try {
            dbClient.connect().then(() => {
                const query = `INSERT INTO prayer_request(request_created_dt, request_category, request_details, request_status) VALUES ($1, $2, $3, $4)`;
                const values = [input_dt, input_category, input_details, input_status];
                dbClient.query(query, values).then((result) => {
                    dbClient.end();
                    resolve(result);
                });
            });
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }
    });
}
async function delistPrayerRequest(input_id) {
    const dbClient = new Client(dbConfig);
    return new Promise((resolve, reject) => {
        try {
            dbClient.connect().then(() => {
                const query = `UPDATE prayer_request SET request_status = 'inactive' WHERE request_created_dt = $1`;
                const values = [input_id];
                dbClient.query(query, values).then((result) => {
                    dbClient.end();
                    resolve(result);
                });
            });
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }
    });
}
async function deletePrayerRequest(input_id) {
    const dbClient = new Client(dbConfig);
    return new Promise((resolve, reject) => {
        try {
            dbClient.connect().then(() => {
                const query = `DELETE FROM prayer_request WHERE request_created_dt = $1;`;
                const values = [input_id];
                dbClient.query(query, values).then((result) => {
                    dbClient.end();
                    resolve(result);
                });
            });
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }
    });
}
module.exports = {
    queryAllActivePrayerRequests,
    insertPrayerRequest,
    delistPrayerRequest,
    deletePrayerRequest
};