var express = require('express');
var router = express.Router();

/* GET prayer page. */
router.get('/', function(req, res, next) {
  res.render('prayer', { title: 'Prayer' });
  return;
});

/* POST prayer request submission. */
router.post('/submitPrayerRequest', function(req, res, next) {
  console.log(req.body);
  res.setHeader('Content-Type', 'text/html');
  res.end(JSON.stringify(req.body));
  return;
});

module.exports = router;
