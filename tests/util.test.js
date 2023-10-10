/*
  Filename: util.test.js
  Author: Timothy Damir Kovacic
 */
const util = require('../util');
const db = require('../db');
jest.mock('../db', () => ({
    queryAllActivePrayerRequests: jest.fn(),
    insertPrayerRequest: jest.fn(),
}));
describe('Util Tests', () => {
    it('getAllPrayerRequests should call queryAllActivePrayerRequests', () => {
        db.queryAllActivePrayerRequests.mockReturnValue(['request1', 'request2']);
        const result = util.getAllPrayerRequests();
        expect(db.queryAllActivePrayerRequests).toHaveBeenCalled();
        expect(result).toEqual(['request1', 'request2']);
    });
    it('createPrayerRequest should call insertPrayerRequest', () => {
        db.insertPrayerRequest.mockReturnValue('newRequest');
        const result = util.createPrayerRequest('category', 'details');
        expect(db.insertPrayerRequest).toHaveBeenCalledWith('category', 'details');
        expect(result).toEqual('newRequest');
    });
});