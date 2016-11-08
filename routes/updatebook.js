var express = require('express');
var router = express.Router();
const test = require( '../public/javascripts/test' )

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', test: test() });
});

router.get('/add', function(req, res, next) {
  res.render('index', { title: 'Add Book', test: test() });
});

router.get('/remove', function(req, res, next) {
  res.render('index', { title: 'Remove Book', test: test() });
});




module.exports = router;
