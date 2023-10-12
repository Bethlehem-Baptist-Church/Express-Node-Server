/*
  Filename: prayer.js
  Author: Timothy Damir Kovacic
 */
const express = require('express');
const router = express.Router();
const utility = require('../util');
router.get('/', function(req, res, next) {
  if(null == req.query.r_success) {
    res.render('viewPrayer', { title: 'View Prayer Requests', r_success: false });
  } else {
    res.render('viewPrayer', { title: 'View Prayer Requests', r_success: true });
  }

  return;
});
router.get('/create', function(req, res, next) {
  res.render('createPrayer', { title: 'Create Prayer Requests' });
  return;
});
router.get('/requests', function(req, res, next) {
  utility.getAllPrayerRequests().then((resultSet) => {
    let prayerRequests = '{"data":[';
    if(null != resultSet && resultSet.length > 0) {
      resultSet.forEach((result) => {
        const resultData = '["' + result.request_created_dt + '","' + result.request_category + '","' + result.request_details + '","' + result.request_status + '","<a href=\'/prayer/edit?id=' + result.request_created_dt + '\' class=\'btn btn-lg btn-light fw-bold border-white bg-white\' style=\'display: none; width: 40px; height: 40px; background-color: #749155 !important; border-color: #749155 !important; color: white;\'><i class=\'fa fa-pencil-square-o\' aria-hidden=\'false\' style=\'margin-left:-5px;position:relative;top:-5px;\'></i></a><a href=\'/prayer/remove?id=' + result.request_created_dt + '\' class=\'btn btn-lg btn-light fw-bold border-white bg-white\' style=\'width: 40px; height: 40px; background-color: #d33333 !important; border-color: #d33333 !important; color: white; margin: 5px !important;\'><i class=\'fa fa-trash\' aria-hidden=\'false\' style=\'margin-left:-5px;position:relative;top:-5px;\'></i></a>"' + '],';
        prayerRequests += resultData;
      });
      prayerRequests = prayerRequests.slice(0, prayerRequests.length - 1);
    }
    prayerRequests += ']}';
    res.setHeader('Content-Type', 'application/json');
    res.send(prayerRequests).end();
    return;
  });
});
router.post('/submit', function(req, res, next) {
  utility.createPrayerRequest(req.body.category, req.body.prayerRequest).then((result) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(result).end();
    return;
  });
});
router.get('/remove', function(req, res, next) {
  utility.deactivatePrayerRequest(req.query.id).then((result) => {
    res.setHeader('Content-Type', 'text/html');
    res.redirect('/prayer?r_success=true');
    return;
  });
});
router.post('/delete', function(req, res, next) {
  utility.deletePrayerRequest(req.body.id).then((result) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(result).end();
    return;
  });
});
module.exports = router;
