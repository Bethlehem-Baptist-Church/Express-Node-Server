/*
  Filename: prayer.js
  Author: Timothy Damir Kovacic
 */
const express = require('express');
const router = express.Router();
const utility = require('../util');
router.get('/', function(req, res, next) {
  if(null == req.query.r_success && null == req.query.e_success && null == req.query.error) {
    res.render('viewPrayer', { title: 'View Prayer Requests', r_success: false, e_success: false, error: false });
  } else if(null != req.query.r_success && null == req.query.e_success && null == req.query.error) {
    res.render('viewPrayer', { title: 'View Prayer Requests', r_success: true, e_success: false, error: false });
  } else if(null == req.query.r_success && null != req.query.e_success && null == req.query.error) {
    res.render('viewPrayer', { title: 'View Prayer Requests', r_success: false, e_success: true, error: false });
  } else {
    res.render('viewPrayer', { title: 'View Prayer Requests', r_success: false, e_success: false, error: true });
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
        let categoryValue = '';
        if(result.request_category == 'Praise & Rejoice') {
          categoryValue = '1';
        } else if(result.request_category == 'Health & Safety') {
          categoryValue = '2';
        } else if(result.request_category == 'Guidance & Wisdom') {
          categoryValue = '3';
        } else if(result.request_category == 'Peace & Happiness') {
          categoryValue = '4';
        } else if(result.request_category == 'Strength & Courage') {
          categoryValue = '5';
        } else if(result.request_category == 'Attention & Care') {
          categoryValue = '6';
        } else if(result.request_category == 'Recovery & Renewal') {
          categoryValue = '7';
        } else {
          categoryValue = '8';
        }
        const details = result.request_details.replace('\'',"");
        const resultData = '["' + result.request_created_dt + '","' + result.request_category + '","' + result.request_details + '","' + result.request_status + '","<a href=\'/prayer/edit?id=' + result.request_created_dt + '&category=' + categoryValue + '&details=' + details + '\' class=\'btn btn-lg btn-light fw-bold border-white bg-white\' style=\'width: 40px; height: 40px; background-color: #749155 !important; border-color: #749155 !important; color: white;\'><i class=\'fa fa-pencil-square-o\' aria-hidden=\'false\' style=\'margin-left:-5px;position:relative;top:-5px;\'></i></a><a href=\'/prayer/remove?id=' + result.request_created_dt + '\' class=\'btn btn-lg btn-light fw-bold border-white bg-white\' style=\'width: 40px; height: 40px; background-color: #d33333 !important; border-color: #d33333 !important; color: white; margin-left: 10px !important;\'><i class=\'fa fa-trash\' aria-hidden=\'false\' style=\'margin-left:-5px;position:relative;top:-5px;\'></i></a>"' + '],';
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
router.get('/edit', function(req, res, next) {
  if(null == req.query.id || null == req.query.category || null == req.query.details) {
    res.redirect('/prayer?error=true');
  } else {
    res.render('editPrayer', { title: 'Edit Prayer Requests', id: req.query.id, category: req.query.category, details: req.query.details });
    return;
  }
});
router.post('/edit/submit', function(req, res, next) {
  if(null == req.body.id || null == req.body.category || null == req.body.details) {
    res.redirect('/prayer?error=true');
  } else {
    utility.editPrayerRequest(req.body.id, req.body.category, req.body.details).then((result) => {
      res.setHeader('Content-Type', 'text/html');
      res.send(null).end();
      return;
    });
  }
});
router.get('/remove', function(req, res, next) {
  utility.deactivatePrayerRequest(req.query.id).then((result) => {
    res.redirect('/prayer?r_success=true');
    return;
  }).catch((error) => {
    res.redirect('/prayer?error=true');
    return;
  });
});
router.post('/delete', function(req, res, next) {
  utility.deletePrayerRequest(req.body.id).then((result) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(result).end();
    return;
  }).catch((error) => {
    res.redirect('/prayer?error=true');
    return;
  });
});
module.exports = router;
