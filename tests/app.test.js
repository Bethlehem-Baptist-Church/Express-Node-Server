/*
  Filename: app.test.js
  Author: Timothy Damir Kovacic
 */
const request = require('supertest');
const app = require('../app');
describe('Express App Tests', () => {
    it('GET / should return 200 OK', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
    it('GET /prayer should return 200 OK', async () => {
        const response = await request(app).get('/prayer');
        expect(response.status).toBe(200);
    });
    it('GET /users should return 200 OK', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
    });
    it('GET /nonexistent should return 404 Not Found', async () => {
        const response = await request(app).get('/nonexistent');
        expect(response.status).toBe(404);
    });
});