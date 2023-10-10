/*
  Filename: prayer.test.js
  Author: Timothy Damir Kovacic
 */
const request = require('supertest');
const utility = require('../util');
jest.mock('../util', () => ({
    getAllPrayerRequests: jest.fn(),
    createPrayerRequest: jest.fn(),
}));
const app = require('../app');

/*const express = require('express');
const prayerRouter = require('../routes/prayer');

const testApp = express();
testApp.use('/', prayerRouter);*/

describe('Prayer Route Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('GET /prayer should return 200 OK and render the "prayer" view with title "Bethlehem Baptist Church"', async () => {
        const response = await request(app).get('/prayer');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Bethlehem Baptist Church'); // Check if the response contains the expected view content
    });
    it('GET /requests should return a JSON response with prayer requests', async () => {
        const expectedResult = { data: [] };
        utility.getAllPrayerRequests.mockImplementation(() => Promise.resolve(expectedResult));
        const response = await request(app).get('/prayer/requests');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expectedResult);
    });
    it('POST /submitPrayerRequest should return a text/html response with the result', async () => {
        const expectedResult = "{}";
        utility.createPrayerRequest.mockResolvedValue(expectedResult);
        const response = await request(app)
            .post('/prayer/submit')
            .send({ category: 'Category', prayerRequest: 'Request' });
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/text\/html/);
        expect(response.text).toEqual(expectedResult);
    });
});
