/*
  Filename: users.test.js
  Author: Timothy Damir Kovacic
 */
const request = require('supertest');
const app = require('../app');
describe('Users Route Tests', () => {
    it('GET /users should return "respond with a resource"', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.text).toBe('respond with a resource');
    });
});
