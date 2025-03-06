var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  console.log(req.query.type, req.body.username, req.body.password);
  if(req.body.username == 'johnny' && 
    req.body.password=='123456') res.send('ok');
  else res.send('invaild username and password');
});

// front end: pass food request for weekdays
// e.g. /users/food?monday=sushi, optional (monday ~ sunday)
//days not specified, 
router.get('/food', function(req, res, next) {
  const defFood = {
    monday:"food1", tuesday:"food2", wednesday:"food3",
    thusday:"food4", friday:"food5", saturday:"food6",sunday:"food7"
  }, food={};
  
  for(let f in defFood) {
    food[f] = req.query[f] || defFood[f];
  }
  res.json(food);
});
module.exports = router;
