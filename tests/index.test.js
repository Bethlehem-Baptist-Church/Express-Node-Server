/*
  Filename:index.test.js
  Author: Timothy Damir Kovacic
 */
const request = require('supertest');
const app = require('../app');
describe('Index Route Tests', () => {
    it('GET / should return the "index" view with title "Bethlehem Baptist Church"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Bethlehem Baptist Church');
    });
});
