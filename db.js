const { Client } = require('pg');
const settings = require("./config/localSettings.json");

async function getSecrets() {
    // CLOUD_SQL_CREDENTIALS_SECRET is the resource ID of the secret, passed in by environment variable.
// Format: projects/PROJECT_ID/secrets/SECRET_ID/versions/VERSION
    const {pgsql_host_v} = process.env;
    let pgsql_host = '';
    if (pgsql_host_v) {
        try {
            pgsql_host = JSON.parse(pgsql_host_v.toString('utf8'));
        } catch (err) {
            throw Error(
                `Unable to parse secret from Secret Manager. Make sure that the secret is JSON formatted: ${err}`
            );
        }
    } else {
        const settings = require('./config/localSettings.json');
        pgsql_host = settings.pgsql_host;
    }

    const {pgsql_pass_v} = process.env;
    let pgsql_pass = '';
    if (pgsql_pass_v) {
        try {
            pgsql_pass = JSON.parse(pgsql_pass_v.toString('utf8'));
        } catch (err) {
            throw Error(
                `Unable to parse secret from Secret Manager. Make sure that the secret is JSON formatted: ${err}`
            );
        }
    } else {
        const settings = require('./config/localSettings.json');
        pgsql_pass = settings.pgsql_pass;
    }
    /*
    const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
    const client = new SecretManagerServiceClient();
    const [pgsql_host_v] = await client.accessSecretVersion({
        name: 'projects/333759091775/secrets/pgsql-host-ip/latest/version',
    });
    const pgsql_host = pgsql_host_v.payload.data.toString();

    const [pgsql_pass_v] = await client.accessSecretVersion({
        name: 'projects/333759091775/secrets/pgsql-user-postgres/latest/version',
    });
    const pgsql_pass = pgsql_pass_v.payload.data.toString();
    */

    const dbConfig = {
        user: 'postgres',
        password: pgsql_pass,
        database: 'postgres',
        host: pgsql_host,
        port: 5432,
        ssl: false
    };
    return dbConfig;
}

async function queryAllActivePrayerRequests() {
    const dbConfig = await getSecrets();
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