/*
  Filename: db.test.js.js
  Author: Timothy Damir Kovacic
 */
const { Client } = require('pg');
const { queryAllActivePrayerRequests, insertPrayerRequest } = require('../db');
jest.mock('pg', () => {
    const mClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});
describe('Database Tests', () => {
    let clientMock;
    beforeEach(() => {
        clientMock = new Client();
        clientMock.connect.mockResolvedValue();
        clientMock.end.mockResolvedValue();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('queryAllActivePrayerRequests should query the database', async () => {
        const expectedResult = [{ id: 1, request: 'Request 1' }];
        clientMock.query.mockResolvedValue({ rows: expectedResult });
        const result = await queryAllActivePrayerRequests();
        expect(result).toEqual(expectedResult);
        expect(clientMock.connect).toHaveBeenCalled();
        expect(clientMock.query).toHaveBeenCalled();
        expect(clientMock.end).toHaveBeenCalled();
    });
    it('insertPrayerRequest should insert a prayer request into the database', async () => {
        const inputCategory = 'Category';
        const inputDetails = 'Details';
        clientMock.query.mockResolvedValue({});
        const result = await insertPrayerRequest(inputCategory, inputDetails);
        expect(result).toEqual({});
        expect(clientMock.connect).toHaveBeenCalled();
        expect(clientMock.query).toHaveBeenCalled();
        expect(clientMock.end).toHaveBeenCalled();
    });
});
