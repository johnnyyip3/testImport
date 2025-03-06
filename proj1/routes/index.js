var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    titleT: 'Express1', 
    titleH: 'Express2', 
    titleB: 'Express3dHIHI' });
});

module.exports = router;
