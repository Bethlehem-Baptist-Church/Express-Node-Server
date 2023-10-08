/*
  Filename: prayer.js
  Author: Timothy Damir Kovacic
 */
const express = require('express');
const router = express.Router();
const utility = require('../util');

/* GET prayer page. */
router.get('/', function(req, res, next) {
  res.render('prayer', { title: 'Prayer' });
  return;
});

/* GET prayer requests. */
router.get('/requests', function(req, res, next) {
  utility.getAllPrayerRequests().then((resultSet) => {
    let prayerRequests = '{"data":[';
    if(null != resultSet && resultSet.length > 0) {
      resultSet.forEach((result) => {
        const resultData = '["' + result.request_created_dt + '","' + result.request_category + '","' + result.request_details + '","' + result.request_status + '"],';
        prayerRequests += resultData;
      });
      prayerRequests = prayerRequests.slice(0, prayerRequests.length - 1);
    }
    prayerRequests += ']}';
    console.log(prayerRequests);
    res.setHeader('Content-Type', 'application/json');
    res.send(prayerRequests).end();
    return;
  });
});

/* POST prayer request submission. */
router.post('/submitPrayerRequest', function(req, res, next) {
  utility.createPrayerRequest(req.body.category, req.body.prayerRequest).then((result) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(result).end();
    return;
  });
});

module.exports = router;
