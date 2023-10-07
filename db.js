const { Client } = require('pg');

let dbConfig = {
    user: 'postgres',
    password: process.env.pgsql_pass,
    database: 'postgres',
    host: process.env.pgsql_host,
    port: 5432,
    ssl: false
};

async function queryAllActivePrayerRequests() {
    if (null == process.env.pgsql_host) {
        const settings = require('./config/localSettings.json');
        dbConfig.host = settings.pgsql_host;
    }
    if (null == process.env.pgsql_pass) {
        const settings = require('./config/localSettings.json');
        dbConfig.password = settings.pgsql_pass;
    }
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
    const dbConfig = await getSecrets();
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

module.exports = {
    queryAllActivePrayerRequests,
    insertPrayerRequest
};