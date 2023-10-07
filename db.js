const { Client } = require('pg');

async function getSecrets() {
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