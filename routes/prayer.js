var express = require('express');
var router = express.Router();

/* GET prayer page. */
router.get('/', function(req, res, next) {
  res.render('prayer', { title: 'Prayer' });
  return;
});

/* POST prayer request submission. */
router.post('/submitPrayerRequest', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.end('Prayer request recieved.');
  return;
});

module.exports = router;
